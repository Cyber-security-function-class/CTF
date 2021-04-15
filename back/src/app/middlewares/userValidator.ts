'use strict';
import { validationResult, check, body } from 'express-validator';


export const resultsValidator = (req) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
        messages.push(i)
        }
    }
    return messages
}

export const signUpValidator = () => {
    return [
        body('nickname')
            .notEmpty()
            .withMessage('nickname is required')
            .not()
            .custom((val) => /[^A-za-z0-9\s]/g.test(val))
            .withMessage('nickname not use uniq characters'),
        body('password')
            .notEmpty()
            .withMessage('password is required')
            .isLength({ min: 8 })
            .withMessage('password must be 8 characters'),
        body('email')
            .notEmpty()
            .withMessage('email is required')
            .isEmail()
            .withMessage('Email must be validatable email')
    ]
}

export const signInValidator = () => {
    return [
        body('email').notEmpty().withMessage('email is required'),
        body('password').notEmpty().withMessage('password is required')
    ]
}