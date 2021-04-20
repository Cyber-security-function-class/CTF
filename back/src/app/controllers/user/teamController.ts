import { Request, Response } from "express";
import { Repository } from "sequelize-typescript";
import db from '../../models/index'
import { Team } from '../../models/Team'
import { User } from '../../models/User'
import { ErrorType, getErrorMessage } from '../../error/index'
import { genSalt, hash, compare } from 'bcrypt'
import { validationResult } from "express-validator";


const teamRepository: Repository<Team> = db.sequelize.getRepository(Team)
const userRepository:Repository<User> = db.sequelize.getRepository(User)


const createHashedPassword = async (password: string) => {
    const saltRounds = 10
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}

const checkPassword = async (password: string, hashedPassword: string) => {
    const isPasswordCorrect = await compare(password, hashedPassword) // hash.toString for type checking hack
    return isPasswordCorrect
}


export const getTeam = async (req : Request, res : Response) => { // get
    const { id } = req.query
    try {
        const team = await teamRepository.findOne({
            where : {id},
            raw:true,
            attributes: ['teamName','score'],
            include: [
                {
                model: userRepository,
                required: false
            }]
        })
        if ( team !== null) {
            return res.json(team)
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist), detail:"team not exist"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const createTeam = async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { teamName, teamPassword } = req.body
    const leaderId = req['decoded'].id
    
    let leader
    let hasTeam:boolean // is user has team
    try {
        leader = await userRepository.findOne({where : {id:leaderId},raw:true, attributes:['teamId']})
        if ( leader ){
            // if user has team : true 
            hasTeam = ( leader.teamId !== null ) ? true : false
        } else { // user is not Exist, wtf?
            throw "unvalid user trying to make a team"
        }
    } catch (err) {
        return res.status(500).json({error:getErrorMessage(ErrorType.NotExist),detail : "cannot find user.."})
    }


    if ( !hasTeam ) {
        const hashedTeamPassword = await createHashedPassword(teamPassword)
        const newTeam = await teamRepository.findOrCreate({
            where: { teamName },
            defaults: { 
                leader : leaderId,
                score : 0,
                teamPassword : hashedTeamPassword
            }
        })
        if (newTeam[1]){ // team already exists : false
            // join to team
            await userRepository.update({
                teamId : newTeam[0].id
            },{
                where : { id : leaderId },
            })
            console.log(newTeam)
            return res.json({
                result : newTeam[1],
                team : {
                    id : newTeam[0].id,
                    teamName : newTeam[0].teamName
                }
            })
        } else {

        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail:"you already joined another team!"})
    }
   
}