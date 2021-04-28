'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamValidator = exports.joinTeamValidator = exports.createTeamValidator = void 0;
const express_validator_1 = require("express-validator");
const validators = {
    teamName: express_validator_1.body('teamName')
        .notEmpty()
        .withMessage('teamName is required')
        .isString()
        .withMessage("teamName must be string"),
    teamPassword: express_validator_1.body('teamPassword')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be 8 characters'),
};
const createTeamValidator = () => {
    return [
        validators.teamName,
        validators.teamPassword
    ];
};
exports.createTeamValidator = createTeamValidator;
const joinTeamValidator = () => {
    return [
        validators.teamName,
        validators.teamPassword
    ];
};
exports.joinTeamValidator = joinTeamValidator;
const getTeamValidator = () => {
    return [
        express_validator_1.query('id')
            .notEmpty()
            .withMessage('id is required')
            .isString()
            .withMessage('id must be string')
    ];
};
exports.getTeamValidator = getTeamValidator;
//# sourceMappingURL=teamValidator.js.map