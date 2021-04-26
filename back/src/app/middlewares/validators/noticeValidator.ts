'use strict'
import { body, query } from "express-validator"

export const addNoticeValidator = () => {
    return [
        body('content')
            .notEmpty()
            .withMessage('category is required')
            .isObject()
            .withMessage("category must be string")
    ]
}
export const updateNoticeValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage("id must be a number"),
        body('content')
            .notEmpty()
            .withMessage('category is required')
            .isObject()
            .withMessage("category must be string")
    ]
}
export const deleteNoticeValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage("id must be a number")
    ]
}