'use strict'
import { body } from "express-validator"

const validators = {
    id : body('id')
        .notEmpty()
        .withMessage('id is required')
        .isNumeric()
        .withMessage("id must be a number"),
    content : body('content')
        .notEmpty()
        .withMessage('category is required')
        .isObject()
        .withMessage("category must be string")
}

export const addNoticeValidator = () => {
    return [
        validators.content
    ]
}
export const updateNoticeValidator = () => {
    return [
        validators.id,
        validators.content,
    ]
}
export const deleteNoticeValidator = () => {
    return [
        validators.id
    ]
}