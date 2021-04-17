import {Request, Response} from 'express'
import db from '../../models/index'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"
import { Op } from 'sequelize'

const Challenge = db.Challenge
const Category = db.Category
const Solved = db.Solved
const User = db.User

export const getChallenges = async (req:Request, res:Response) => {
    try {
        const challenges = await Challenge.findAll({
            attributes : ['id','title','score','category'],
            raw : true
        })
        return res.json({result:challenges})
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const getChallenge = async (req:Request, res:Response) => {
    // get by challenge id
    const { id } = req.query
    const numId = +id
    
    if ( numId === undefined || numId === NaN) { 
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError) })
    }
    try {
        const challenge = await Challenge.findOne({
            where : { 
                id : numId
            },
            attributes : ['id','title','content','score','category_id'],
            raw : true,
            include: [{
                model: Category,
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

    const { title, score,category_id, content, flag} = req.body
    

    try {
        if ( await Category.findOne({where : {id : category_id}}) !== null) {
            const chall = await Challenge.create({
                title,
                score,
                content,
                flag,
                category_id 
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
    const {id,title,content,score,flag,category_id} = req.body
    
    if ( await Challenge.findOne({where : id}) === null) {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }

    if( await Category.findOne({where : {id:category_id}}) !== null) {
        try {
            await Challenge.update({
                title,
                content,
                score,
                flag,
                category_id
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
    if ( await Challenge.findOne({where:{id}}) !== null) {
        try {
            await Challenge.destroy({where:{id}})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }
}

export const authFlag = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { challenge_id, flag } = req.body
    const user_id = req['decoded'].id
    const challenge = await Challenge.findOne({where: {id : challenge_id},raw : true})
    if (challenge !== null ) {
        if ( flag === challenge.flag ) { // flag correct
            try {
                if ( 
                    await Solved.findOne({where :{
                        [Op.or]: [{ user_id: user_id}, { challenge_id: challenge_id}]
                    }}) === null) {
                    const solved = await Solved.create({
                        challenge_id,
                        user_id,
                        score:challenge.score
                    })
                    const user = await User.findOne({where: {id : user_id}})
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