'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamValidator = exports.joinTeamValidator = exports.createTeamValidator = void 0;
const express_validator_1 = require("express-validator");
const createTeamValidator = () => {
    return [
        express_validator_1.body('teamName')
            .notEmpty()
            .withMessage('teamName is required')
            .isString()
            .withMessage("teamName must be string"),
        express_validator_1.body('teamPassword')
            .notEmpty()
            .withMessage("teamPassword is required")
            .isString()
            .withMessage("teamPassword must be string")
    ];
};
exports.createTeamValidator = createTeamValidator;
const joinTeamValidator = () => {
    return [
        express_validator_1.body("teamName")
            .notEmpty()
            .withMessage('teamName is required')
            .isString()
            .withMessage("teamName must be string"),
        express_validator_1.body("teamPassword")
            .notEmpty()
            .withMessage('teamPassword is required')
            .isString()
            .withMessage("teamPassword must be string")
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