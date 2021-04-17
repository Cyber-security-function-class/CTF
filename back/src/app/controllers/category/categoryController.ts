'use strict'

import {Request, Response} from 'express'
import db from "../../models/index"
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"
import sequelize from 'sequelize'
import category from '.'

const Category = db.Category

export const getCategories = async (req: Request, res: Response) => {

    try {
        const categories = await Category.findAll({ 
            raw : true
        })

        res.json ( categories )
    } catch (err){
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const addCategory = async (req: Request, res: Response) => {
    if ( !req['decoded'].isAdmin) {
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }
    let { category } = req.body
    category = category.toLowerCase()

    let isExistCategory
    try {
        isExistCategory = await Category.findOne({
            where : sequelize.where(
                sequelize.fn('lower', sequelize.col('category')), 
                sequelize.fn('lower', category
                )
            ),
            raw : true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

    if ( isExistCategory === null) {
        // make new category
        const newCategory = await Category.create({
            category : category
        })
        return res.json(newCategory)
    } else {
        return res.status(409).json(getErrorMessage(ErrorType.AlreadyExist)).send()
    }
}

export const updateCategory = async (req:Request, res:Response) => {
    if ( !req['decoded'].isAdmin) {
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
        // he is not a admin
    }
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }
    const { id, category} = req.body
    if ( await Category.findOne({ where : { id },raw : true}) !== null ) {
        try {
            await Category.update({category},{where : {id}})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json(getErrorMessage(ErrorType.NotExist)).send()
    }
}