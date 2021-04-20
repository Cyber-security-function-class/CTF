'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeamValidator = void 0;
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
//# sourceMappingURL=teamValidator.js.map