'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidator = exports.signUpValidator = void 0;
var express_validator_1 = require("express-validator");
var signUpValidator = function () {
    return [
        express_validator_1.body('nickname')
            .notEmpty()
            .withMessage('nickname is required')
            .not()
            .custom(function (val) { return /[^A-za-z0-9\s]/g.test(val); })
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
var signInValidator = function () {
    return [
        express_validator_1.body('email').notEmpty().withMessage('email is required'),
        express_validator_1.body('password').notEmpty().withMessage('password is required')
    ];
};
exports.signInValidator = signInValidator;
//# sourceMappingURL=userValidator.js.map