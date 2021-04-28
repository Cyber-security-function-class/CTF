
'use strict'

import { body, query } from "express-validator"

const validators = {
    
    teamName : body('teamName')
            .notEmpty()
            .withMessage('teamName is required')
            .isString()
            .withMessage("teamName must be string"),
    teamPassword : body('teamPassword')
            .notEmpty()
            .withMessage('password is required')
            .isLength({ min: 8 })
            .withMessage('password must be 8 characters'),
}

export const createTeamValidator = () => {
    return [
        validators.teamName,
        validators.teamPassword
    ]
}

export const joinTeamValidator = () => {
    return [
        validators.teamName,
        validators.teamPassword
    ]
}

export const getTeamValidator = () => {
    return [
        query('id')
            .notEmpty()
            .withMessage('id is required')
            .isString()
            .withMessage('id must be string')
    ]
}