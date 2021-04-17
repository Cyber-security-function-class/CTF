'use strict';
import { body } from 'express-validator';


export const addChallengeValidator = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('title is required'),
        body('content')
            .notEmpty()
            .withMessage('content is required'),
        body('score')
            .notEmpty()
            .withMessage('score is required'),
        body('category_id')
            .notEmpty()
            .withMessage('category is required'),
        body('flag')
            .notEmpty()
            .withMessage("flag is required")
    ]
}