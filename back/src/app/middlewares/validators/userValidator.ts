'use strict';
import { body, query } from 'express-validator';


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

export const getUserValidator = () => {
    return [
        query('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage('id must be number')
    ]
}

export const updateUserValidator = () => {
    return [
        body('nickname')
            .notEmpty()
            .withMessage('nickname is required')
            .isString()
            .withMessage("nickname must be string"),
        body('email')
            .notEmpty()
            .withMessage('email is required')
            .isEmail()
            .withMessage("Email must be validatable email"),
        body('score')
            .notEmpty()
            .withMessage('score is required')
            .isNumeric()
            .withMessage("score is must be number"),
        body('isAdmin')
            .notEmpty()
            .withMessage("isAdmin is required")
            .isBoolean()
            .withMessage("isAdmin is must be boolean")
    ]
}

export const deleteUserValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage('id must be number')
    ]
}
