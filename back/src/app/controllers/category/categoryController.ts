'use strict'

import {Request, Response} from 'express'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"

import db from '../../models/index'
import sequelize, { Op } from 'sequelize'

const categoryRepository = db.repositories.categoryRepository

export const getCategories = async (req: Request, res: Response) => {

    try {
        const categories = await categoryRepository.findAll({ 
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
        isExistCategory = await categoryRepository.findOne({
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
        await categoryRepository.create({
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
    const beforeUpdate = await categoryRepository.findAll({
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
            await categoryRepository.update({category},{where : {id}})
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
    if ( await categoryRepository.findOne({ where : { id },raw : true}) !== null ) {
        try {
            await categoryRepository.destroy({where : { id }})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json(getErrorMessage(ErrorType.NotExist)).send()
    }
}