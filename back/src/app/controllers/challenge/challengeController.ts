import {Request, Response} from 'express'
import db from '../../models/index'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"
import { Op, Sequelize } from 'sequelize'
import { Challenge } from '../../models/Challenge'
import { Category } from '../../models/Category'
import { Solved } from '../../models/Solved'
import { User } from '../../models/User'
import { Team } from '../../models/Team'

const challengeRepository = db.sequelize.getRepository(Challenge)
const categoryRepository = db.sequelize.getRepository(Category)
const solvedRepository = db.sequelize.getRepository(Solved)
const userRepository = db.sequelize.getRepository(User)
const teamRepository = db.sequelize.getRepository(Team)

export const getChallenges = async (req:Request, res:Response) => {
    const category = req.query['category']
    
    try {
        let challenges
        if (!category){
            challenges = await challengeRepository.findAll({
                attributes : ['id','title','score','categoryId'],
                include: [{
                    model: categoryRepository,
                    as: 'category',
                    attributes : ['category']
                }],
                raw : true
            })
            return res.json(challenges)
        } else {
            let f = []
            new Promise ((resolve) => {
                const filterList = category.toString().split(',')
                filterList.forEach((e,i) => {
                    let tmp = parseInt(e)
                    if ( !isNaN(tmp)) {
                        f.push({"categoryId" : tmp})
                    }
                    if(i >= filterList.length-1) {
                        resolve(f)
                    }
                })
            }).then( async (f) => {
                challenges = await challengeRepository.findAll({
                    where : {
                        [Op.or]: f
                    },
                    attributes : ['id','title','score','categoryId'],
                    include : [{
                        model: categoryRepository,
                        as: 'category',
                        attributes : ['category']
                    }],
                    raw : true
                })
                return res.json(challenges)
            }).catch(err => {
                console.log(err)
                return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
            })
        }
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const getChallenge = async (req:Request, res:Response) => {
    // get by challenge id
    const { id } = req.query
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    try {
        const challenge = await challengeRepository.findOne({
            where : { 
                id : id
            },
            attributes : ['id','title','content','score','categoryId'],
            raw : true,
            include: [{
                model: categoryRepository,
                as: 'category'
            }]
        })
        if ( challenge !== null){
            return res.json(challenge)
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),"detail":"Challenge not exist"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }

}

export const addChallenge = async (req:Request, res:Response) => {
    
    if ( !req['decoded'].isAdmin) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { title, score,categoryId, content, flag} = req.body
    
    try {
        if ( await categoryRepository.findOne({where : {id : categoryId}}) !== null) {
            if ( await challengeRepository.findOne({where : {flag}}) !== null) {
                return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail : "The same flag already exist."})
            }
            await challengeRepository.create({
                title,
                score,
                content,
                flag,
                categoryId,
            })
            return res.json({result : true})
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),"detail":"category not exist"})
        } 
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

}

export const updateChallenge = async (req:Request, res:Response) => {
    if ( !req['decoded'].isAdmin) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const {id,title,content,score,flag,categoryId} = req.body
    
    if ( await challengeRepository.findOne({where : id}) === null) {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }
    
    if( await categoryRepository.findOne({where : {id:categoryId}}) !== null) {
        try {
            await challengeRepository.update({
                title,
                content,
                score,
                flag,
                categoryId
            },{ 
                where : {id}
            })
            return res.json({result : true})
        } catch(err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),"detail":"category not exist"})
    }
}

export const deleteChallenge = async (req:Request, res:Response) => {
    if ( !req['decoded'].isAdmin) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    
    const { id } = req.body
    if ( await challengeRepository.findOne({where:{id}}) !== null) {
        try {
            await challengeRepository.destroy({where:{id}})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }
}

export const authFlag = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const userId = req['decoded'].id
    const { flag } = req.body
    const user = await userRepository.findOne({
        where : {id : userId},raw : true,
        include : [{
            model : teamRepository,
            attributes : ['id']
        }]
    })
    if ( user === null) {
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }
    
    const teamId = user['team.id']
    const challenge = await challengeRepository.findOne({where : {flag},raw : true})
    if ( challenge !== null && teamId !== null) {
        // flag is correct
        const solved = await solvedRepository.findOrCreate({
            where : {
                teamId,
                challengeId : challenge.id
            },
            defaults: { 
                userId,
                score : challenge.score
            }
        })
        if(solved[1]) { // solved
            await teamRepository.update({score:Sequelize.literal('score + '+challenge.score)},{where : {id : teamId}})
            return res.json({result : true})
        } else { // already solved
            return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail:"already solved"})
        }
    } else {
        if ( teamId === null ) {
            return res.status(400).json({error:getErrorMessage(ErrorType.AccessDenied),detail:"you have to join a team before submit flag."})
        }
        res.json({result : false}) // flag is wrong
    }
}