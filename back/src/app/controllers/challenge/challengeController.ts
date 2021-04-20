import {Request, Response} from 'express'
import db from '../../models/index'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"
import { Op } from 'sequelize'
import { Challenge } from '../../models/Challenge'
import { Category } from '../../models/Category'
import { Solved } from '../../models/Solved'
import { User } from '../../models/User'

const challengeRepository = db.sequelize.getRepository(Challenge)
const categoryRepository = db.sequelize.getRepository(Category)
const solvedRepository = db.sequelize.getRepository(Solved)
const userRepository = db.sequelize.getRepository(User)

export const getChallenges = async (req:Request, res:Response) => {
    const filter = req.query['filter']
    
    try {
        let challenges
        if (!filter){
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
                const filterList = filter.toString().split(',')
                filterList.forEach((e,i) => {
                    let tmp = parseInt(e)
                    if ( !isNaN(tmp)) {
                        f.push({"categoryId" : tmp})
                    }
                    if(i >= filterList.length-1) {
                        console.log("asd")
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
                console.log("challenges ",challenges)
                return res.json({result:challenges})
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
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
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
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { title, score,categoryId, content, flag} = req.body
    
    try {
        if ( await categoryRepository.findOne({where : {id : categoryId}}) !== null) {
            const chall = await challengeRepository.create({
                title,
                score,
                content,
                flag,
                categoryId,
            })
            return res.json(chall)
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
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const {id,title,content,score,flag,categoryId} = req.body
    
    if ( await challengeRepository.findOne({where : id}) === null) {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }

    if( await Category.findOne({where : {id:categoryId}}) !== null) {
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
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
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

/*
export const authFlag = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { challenge_id, flag } = req.body
    const user_id = req['decoded'].id
    const challenge = await challengeRepository.findOne({where: {id : challenge_id},raw : true})
    if (challenge !== null ) {
        if ( flag === challenge.flag ) { // flag correct
            try {
                if ( 
                    await solvedRepository.findOne({where :{
                        [Op.or]: [{ user_id}, {challenge_id}]
                    }}) === null) {
                    const solved = await solvedRepository.create({
                        challenge_id,
                        user_id,
                        score:challenge.score
                    })
                    const user = await userRepository.findOne({where: {id : user_id}})
                    user.increment('score', {by: challenge.score})
                    return res.json(solved)
                } else {
                    return res.status(200).json({error:getErrorMessage(ErrorType.AlreadyExist),"detail":"already solved"})
                }
            } catch (err) {
                console.log(err)
                return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
            }
        } else { // flag incorrect
            return res.json({result:false})
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }
}
*/