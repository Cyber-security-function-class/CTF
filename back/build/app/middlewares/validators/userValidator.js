'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailValidator = exports.deleteUserValidator = exports.updateUserValidator = exports.getUserValidator = exports.signInValidator = exports.signUpValidator = void 0;
const express_validator_1 = require("express-validator");
const validators = {
    id: express_validator_1.body('id')
        .notEmpty()
        .withMessage('id is required')
        .isString()
        .withMessage('id must be string'),
    nickname: express_validator_1.body('nickname')
        .notEmpty()
        .withMessage('nickname is required')
        .isString()
        .withMessage("nickname must be string"),
    password: express_validator_1.body('password')
        .notEmpty()
        .withMessage('password is required')
        .isString()
        .withMessage("password must be string"),
    email: express_validator_1.body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Email must be validatable email'),
    isAdmin: express_validator_1.body('isAdmin')
        .notEmpty()
        .withMessage("isAdmin is required")
        .isBoolean()
        .withMessage("isAdmin is must be boolean"),
    token: express_validator_1.body('token')
        .notEmpty()
        .withMessage('token is required')
        .isString()
        .withMessage('token must be string')
};
const signUpValidator = () => {
    return [
        validators.nickname
            .not()
            .custom((val) => /[^A-za-z0-9\s]/g.test(val))
            .withMessage('nickname not use uniq characters'),
        validators.password
            .isLength({ min: 8 })
            .withMessage('password must be 8 characters'),
        validators.email
    ];
};
exports.signUpValidator = signUpValidator;
const signInValidator = () => {
    return [
        validators.email,
        validators.password
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
        validators.nickname,
        validators.email,
        validators.isAdmin
    ];
};
exports.updateUserValidator = updateUserValidator;
const deleteUserValidator = () => {
    return [
        validators.id
    ];
};
exports.deleteUserValidator = deleteUserValidator;
const verifyEmailValidator = () => {
    return [
        validators.token
    ];
};
exports.verifyEmailValidator = verifyEmailValidator;
//# sourceMappingURL=userValidator.js.map