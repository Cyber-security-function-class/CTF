'use strict'
import { body } from "express-validator"

const validators = {
    id : body('id')
        .notEmpty()
        .withMessage('id is required')
        .isNumeric()
        .withMessage('id must be number'),
    category : body('category')
        .notEmpty()
        .withMessage('category is required')
        .isString()
        .withMessage("category must be string")
    
}

export const addCategoryValidator = () => {
    return [
        validators.category
    ]
}
export const updateCategoryValidator = () => {
    return [
        validators.id,
        validators.category
    ]
}

export const deleteCategoryValidator = () => {
    return  [
        validators.id
    ]
}