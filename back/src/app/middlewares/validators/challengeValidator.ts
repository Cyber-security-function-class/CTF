'use strict';
import { body,query} from 'express-validator';

const validators = {
    id : body('id')
        .notEmpty()
        .withMessage("id is required")
        .isNumeric()
        .withMessage("id is must be number"),
    title : body('title')
        .notEmpty()
        .withMessage('title is required')
        .isString()
        .withMessage("title is must be string"),
    content : body('content')
        .notEmpty()
        .withMessage('content is required')
        .isString()
        .withMessage("content is must be string"),
    score : body('score')
        .notEmpty()
        .withMessage('score is required')
        .isNumeric()
        .withMessage("score is must be number"),
    categoryId : body('categoryId')
        .notEmpty()
        .withMessage('categoryId is required')
        .isNumeric()
        .withMessage("categoryId is must be number"),
    flag : body('flag')
        .notEmpty()
        .withMessage("flag is required")
        .isString()
        .withMessage("flag is must be string")
}
export const addChallengeValidator = () => {
    return [
        validators.title,
        validators.content,
        validators.score,
        validators.categoryId,
        validators.flag,
    ]
}

export const updateChallengeValidator = () => {
    return [
        validators.id,
        validators.title,
        validators.content,
        validators.score,
        validators.categoryId,
        validators.flag,
    ]
}
export const deleteChallengeValidator = () => {
    return [
        validators.id
    ]
}

export const authFlagValidator = () => {
    return [
        validators.flag,
    ]
}

export const getChallengeValidator = () => {
    return [ // this is one is unique because it use query()
        query('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number")
    ]
}