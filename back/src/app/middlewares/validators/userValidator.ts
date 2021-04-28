'use strict';
import { body, query } from 'express-validator';

const validators = {
    id : body('id')
        .notEmpty()
        .withMessage('id is required')
        .isString()
        .withMessage('id must be string'),
    nickname : body('nickname')
        .notEmpty()
        .withMessage('nickname is required')
        .isString()
        .withMessage("nickname must be string"),
    password : body('password')
        .notEmpty()
        .withMessage('password is required')
        .isString()
        .withMessage("password must be string"),
    email : body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Email must be validatable email'),
    isAdmin : body('isAdmin')
        .notEmpty()
        .withMessage("isAdmin is required")
        .isBoolean()
        .withMessage("isAdmin is must be boolean"),
    token : body('token')
        .notEmpty()
        .withMessage('token is required')
        .isString()
        .withMessage('token must be string')
}

export const signUpValidator = () => {
    return [
        validators.nickname
            .not()
            .custom((val) => /[^A-za-z0-9\s]/g.test(val))
            .withMessage('nickname not use uniq characters'),
        validators.password
            .isLength({ min: 8 })
            .withMessage('password must be 8 characters'),
        validators.email
    ]
}

export const signInValidator = () => {
    return [
        validators.email,
        validators.password
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
        validators.nickname,
        validators.email,
        validators.isAdmin
    ]
}

export const deleteUserValidator = () => {
    return [
        validators.id
    ]
}

export const verifyEmailValidator = () => {
    return [
        validators.token
    ]
}