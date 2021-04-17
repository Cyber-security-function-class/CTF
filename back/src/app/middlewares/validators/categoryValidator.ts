'use strict'
import { body } from "express-validator"

export const addCategoryValidator = () => {
    return [
        body('category')
        .notEmpty()
        .withMessage('category is required')
        .isString()
        .withMessage("category must be string")
    ]
}
export const updateCategoryValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage('id must be number'),
        body('category')
            .notEmpty()
            .withMessage('category is required')
            .isString()
            .withMessage("category must be string")
    ]
}

export const deleteCategoryValidator = () => {
    return  [
        body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage('id must be number'),
    ]
}