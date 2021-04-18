'use strict';
import { body,query} from 'express-validator';


export const addChallengeValidator = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('title is required')
            .isString()
            .withMessage("title is must be string"),
        body('content')
            .notEmpty()
            .withMessage('content is required')
            .isString()
            .withMessage("content is must be string"),
        body('score')
            .notEmpty()
            .withMessage('score is required')
            .isNumeric()
            .withMessage("score is must be number"),
        body('category_id')
            .notEmpty()
            .withMessage('category_id is required')
            .isNumeric()
            .withMessage("category_id is must be number"),
        body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ]
}

export const updateChallengeValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number"),
        body('title')
            .notEmpty()
            .withMessage('title is required')
            .isString()
            .withMessage("title is must be string"),
        body('content')
            .notEmpty()
            .withMessage('content is required')
            .isString()
            .withMessage("content is must be string"),
        body('score')
            .notEmpty()
            .withMessage('score is required')
            .isNumeric()
            .withMessage("score is must be number"),
        body('category_id')
            .notEmpty()
            .withMessage('category_id is required')
            .isNumeric()
            .withMessage("category_id is must be number"),
        body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ]
}
export const deleteChallengeValidator = () => {
    return [
        body('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number")
    ]
}

export const authFlagValidator = () => {
    return [
        body('challenge_id')
            .notEmpty()
            .withMessage("challenge_id is required")
            .isNumeric()
            .withMessage("challenge_id is must be number"),
        body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ]
}

export const getChallengeValidator = () => {
    return [
        query('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number")
    ]
}