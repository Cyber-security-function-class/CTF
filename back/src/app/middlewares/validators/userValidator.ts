'use strict';
import { body, query } from 'express-validator';


export const signUpValidator = () => {
    return [
        body("id")
            .notEmpty()
            .withMessage('id is required')
            .isString()
            .withMessage('id is must be string'),
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
            .isString()
            .withMessage('id must be string')
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
        body('isAdmin')
            .notEmpty()
            .withMessage("isAdmin is required")
            .isBoolean()
            .withMessage("isAdmin is must be boolean"),
    ]
}

export const deleteUserValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage('id is required')
            .isString()
            .withMessage('id must be string')
    ]
}

export const verifyEmailValidator = () => {
    return [
        body('token')
            .notEmpty()
            .withMessage('token is required')
            .isString()
            .withMessage('token must be string')
    ]
}