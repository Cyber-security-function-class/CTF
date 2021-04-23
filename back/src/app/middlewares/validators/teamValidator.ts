
'use strict'

import { body, query } from "express-validator"

export const createTeamValidator = () => {
    return [
        body('teamName')
            .notEmpty()
            .withMessage('teamName is required')
            .isString()
            .withMessage("teamName must be string"),
        body('teamPassword')
            .notEmpty()
            .withMessage("teamPassword is required")
            .isString()
            .withMessage("teamPassword must be string")
    ]
}

export const joinTeamValidator = () => {
    return [
        body("teamName")
            .notEmpty()
            .withMessage('teamName is required')
            .isString()
            .withMessage("teamName must be string"),
        body("teamPassword")
            .notEmpty()
            .withMessage('teamPassword is required')
            .isString()
            .withMessage("teamPassword must be string")
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