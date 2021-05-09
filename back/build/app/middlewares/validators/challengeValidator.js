'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallengeValidator = exports.authFlagValidator = exports.deleteChallengeValidator = exports.updateChallengeValidator = exports.addChallengeValidator = void 0;
const express_validator_1 = require("express-validator");
const validators = {
    id: express_validator_1.body('id')
        .notEmpty()
        .withMessage("id is required")
        .isNumeric()
        .withMessage("id is must be number"),
    title: express_validator_1.body('title')
        .notEmpty()
        .withMessage('title is required')
        .isString()
        .withMessage("title is must be string"),
    content: express_validator_1.body('content')
        .notEmpty()
        .withMessage('content is required')
        .isString()
        .withMessage("content is must be string"),
    score: express_validator_1.body('score')
        .notEmpty()
        .withMessage('score is required')
        .isNumeric()
        .withMessage("score is must be number"),
    categoryId: express_validator_1.body('categoryId')
        .notEmpty()
        .withMessage('categoryId is required')
        .isNumeric()
        .withMessage("categoryId is must be number"),
    flag: express_validator_1.body('flag')
        .notEmpty()
        .withMessage("flag is required")
        .isString()
        .withMessage("flag is must be string")
};
const addChallengeValidator = () => {
    return [
        validators.title,
        validators.content,
        validators.score,
        validators.categoryId,
        validators.flag,
    ];
};
exports.addChallengeValidator = addChallengeValidator;
const updateChallengeValidator = () => {
    return [
        validators.id,
        validators.title,
        validators.content,
        validators.score,
        validators.categoryId,
        validators.flag,
    ];
};
exports.updateChallengeValidator = updateChallengeValidator;
const deleteChallengeValidator = () => {
    return [
        validators.id
    ];
};
exports.deleteChallengeValidator = deleteChallengeValidator;
const authFlagValidator = () => {
    return [
        validators.flag,
    ];
};
exports.authFlagValidator = authFlagValidator;
const getChallengeValidator = () => {
    return [
        express_validator_1.query('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number")
    ];
};
exports.getChallengeValidator = getChallengeValidator;
//# sourceMappingURL=challengeValidator.js.map