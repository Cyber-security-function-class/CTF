
'use strict'
import { body } from "express-validator"

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