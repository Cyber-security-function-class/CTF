import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Repository } from "sequelize-typescript";
import { ErrorType, getErrorMessage } from "../../error";
import db from "../../models/index";
import { Notice } from "../../models/Notice";

const noticeRepository:Repository<Notice> = db.sequelize.getRepository(Notice)

export const getNotice = async (req :Request, res :Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const { id } = req.query
    try {
        const notice = await noticeRepository.findOne({where:{id},raw : true})
        if ( notice ) {
            return res.json(notice)
        }
        return res.json({error:getErrorMessage(ErrorType.NotExist), detail:"notice not exist"})
    } catch (err){
        console.log(err)

    }
}
export const getNotices = async (req :Request, res :Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    
    try {
        const notice = await noticeRepository.findAll({raw : true})
        return res.json(notice)
    } catch (err){
        console.log(err)

    }
}
export const createNotice = async (req :Request, res :Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    
    const { content } = req.body
    try {
        
        await noticeRepository.create({content})
        return res.json({result : true})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }
}
export const updateNotice = async (req :Request, res :Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { id, content } = req.body

    try {
        if ( await noticeRepository.findOne({where : {id }}) !== null) {
            await noticeRepository.update({content},{where : {id}})
            return res.json({result : true})
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"the notice that match with id is not exist"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}
export const deleteNotice = async (req :Request, res :Response) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { id } = req.body

    try {
        if ( await noticeRepository.findOne({where : {id }}) !== null) {
            await noticeRepository.destroy({where : {id}})
            return res.json({result : true})
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"the notice that match with id is not exist"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}