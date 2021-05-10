'use strict'

import {Request, Response} from 'express'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"

import sequelize, { Op } from 'sequelize'

import { Category } from '../../models/Category'

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
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }
    const { category } = req.body
    const Lcategory:string = category.toLowerCase()

    let isExistCategory
    try {
        isExistCategory = await Category.findOne({
            where : sequelize.where(
                sequelize.fn('lower', sequelize.col('category')), 
                sequelize.fn('lower', Lcategory
                )
            ),
            raw : true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

    if ( isExistCategory === null) {
        await Category.create({
            category : Lcategory,
        })
        return res.json({result : true})
    } else {
        return res.status(400).json(getErrorMessage(ErrorType.AlreadyExist)).send()
    }
}

export const updateCategory = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }
    const { id, category} = req.body
    const Lcategory = category.toLowerCase()
    const beforeUpdate = await Category.findAll({
        where : { [Op.or]: [
            { id : id },
            { category : sequelize.where(
                sequelize.fn('lower', Lcategory),
                sequelize.fn('lower', sequelize.col('category'))
            )}]
        },
        raw : true
    })
    console.log("before update : ",beforeUpdate)
    let isCategoryOverlap: boolean
    let isIdExist: boolean
    beforeUpdate.find(e => {
        // check if the category field is overlap with another category
        ((e.category.toLowerCase() === Lcategory))? isCategoryOverlap=true : isCategoryOverlap=isCategoryOverlap;
        ((e.id === id))?isIdExist=true : isIdExist=isIdExist;
    })
    if ( isCategoryOverlap ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail:"this category is already exist"}).send()
    } else if ( !isIdExist ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"this id is not exist"}).send()
    } else {
        try {
            await Category.update({category},{where : {id}})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError),detail:"UnexpectedError"}).send()
        }
    }
        
}

export const deleteCategory = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }
    const { id } = req.body
    if ( await Category.findOne({ where : { id },raw : true}) !== null ) {
        try {
            await Category.destroy({where : { id }})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json(getErrorMessage(ErrorType.NotExist)).send()
    }
}