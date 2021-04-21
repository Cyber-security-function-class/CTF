'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = exports.updateUserValidator = exports.getUserValidator = exports.signInValidator = exports.signUpValidator = void 0;
const express_validator_1 = require("express-validator");
const signUpValidator = () => {
    return [
        express_validator_1.body('nickname')
            .notEmpty()
            .withMessage('nickname is required')
            .not()
            .custom((val) => /[^A-za-z0-9\s]/g.test(val))
            .withMessage('nickname not use uniq characters'),
        express_validator_1.body('password')
            .notEmpty()
            .withMessage('password is required')
            .isLength({ min: 8 })
            .withMessage('password must be 8 characters'),
        express_validator_1.body('email')
            .notEmpty()
            .withMessage('email is required')
            .isEmail()
            .withMessage('Email must be validatable email')
    ];
};
exports.signUpValidator = signUpValidator;
const signInValidator = () => {
    return [
        express_validator_1.body('email').notEmpty().withMessage('email is required'),
        express_validator_1.body('password').notEmpty().withMessage('password is required')
    ];
};
exports.signInValidator = signInValidator;
const getUserValidator = () => {
    return [
        express_validator_1.query('id')
            .notEmpty()
            .withMessage('id is required')
            .isString()
            .withMessage('id must be string')
    ];
};
exports.getUserValidator = getUserValidator;
const updateUserValidator = () => {
    return [
        express_validator_1.body('nickname')
            .notEmpty()
            .withMessage('nickname is required')
            .isString()
            .withMessage("nickname must be string"),
        express_validator_1.body('email')
            .notEmpty()
            .withMessage('email is required')
            .isEmail()
            .withMessage("Email must be validatable email"),
        express_validator_1.body('teamId')
            .notEmpty()
            .withMessage("teamId is required")
            .isString()
            .withMessage("teamId is must be string or null"),
        express_validator_1.body('isAdmin')
            .notEmpty()
            .withMessage("isAdmin is required")
            .isBoolean()
            .withMessage("isAdmin is must be boolean"),
    ];
};
exports.updateUserValidator = updateUserValidator;
const deleteUserValidator = () => {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage('id is required')
            .isString()
            .withMessage('id must be string')
    ];
};
exports.deleteUserValidator = deleteUserValidator;
//# sourceMappingURL=userValidator.js.map