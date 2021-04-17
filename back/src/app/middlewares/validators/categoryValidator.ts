'use strict'
import { body } from "express-validator"

export const addCategoryValidator = () => {
    return [
        body('category').notEmpty().withMessage('category is required')
    ]
}