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
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }
}
export const updateNotice = async (req :Request, res :Response) => {
    
}
export const deleteNotice = async (req :Request, res :Response) => {
    
}