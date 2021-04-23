'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallengeValidator = exports.authFlagValidator = exports.deleteChallengeValidator = exports.updateChallengeValidator = exports.addChallengeValidator = void 0;
const express_validator_1 = require("express-validator");
const addChallengeValidator = () => {
    return [
        express_validator_1.body('title')
            .notEmpty()
            .withMessage('title is required')
            .isString()
            .withMessage("title is must be string"),
        express_validator_1.body('content')
            .notEmpty()
            .withMessage('content is required')
            .isString()
            .withMessage("content is must be string"),
        express_validator_1.body('score')
            .notEmpty()
            .withMessage('score is required')
            .isNumeric()
            .withMessage("score is must be number"),
        express_validator_1.body('categoryId')
            .notEmpty()
            .withMessage('categoryId is required')
            .isNumeric()
            .withMessage("categoryId is must be number"),
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ];
};
exports.addChallengeValidator = addChallengeValidator;
const updateChallengeValidator = () => {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number"),
        express_validator_1.body('title')
            .notEmpty()
            .withMessage('title is required')
            .isString()
            .withMessage("title is must be string"),
        express_validator_1.body('content')
            .notEmpty()
            .withMessage('content is required')
            .isString()
            .withMessage("content is must be string"),
        express_validator_1.body('score')
            .notEmpty()
            .withMessage('score is required')
            .isNumeric()
            .withMessage("score is must be number"),
        express_validator_1.body('categoryId')
            .notEmpty()
            .withMessage('categoryId is required')
            .isNumeric()
            .withMessage("categoryId is must be number"),
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ];
};
exports.updateChallengeValidator = updateChallengeValidator;
const deleteChallengeValidator = () => {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number")
    ];
};
exports.deleteChallengeValidator = deleteChallengeValidator;
const authFlagValidator = () => {
    return [
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
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