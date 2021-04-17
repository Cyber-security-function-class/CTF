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
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
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