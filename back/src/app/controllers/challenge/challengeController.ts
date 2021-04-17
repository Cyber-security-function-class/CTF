import {Request, Response} from 'express'
import { title } from 'node:process'
import db from '../../models/index'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"

const Challenge = db.Challenge
const Category = db.Category

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

        res.json(challenge)
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
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }

    const { title, score, category_id, content, flag} = req.body
    

    try {
        // console.log(category_id)
        const chall = await Challenge.create({
            title : title,
            score : 200,
            content : content,
            flag : flag,
            category_id : category_id
        })

        res.json(chall)
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

}