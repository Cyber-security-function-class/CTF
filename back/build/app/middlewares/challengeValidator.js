'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChallengeValidator = void 0;
var express_validator_1 = require("express-validator");
var addChallengeValidator = function () {
    return [
        express_validator_1.body('title')
            .notEmpty()
            .withMessage('title is required'),
        express_validator_1.body('content')
            .notEmpty()
            .withMessage('content is required'),
        express_validator_1.body('score')
            .notEmpty()
            .withMessage('score is required'),
        express_validator_1.body('category')
            .notEmpty()
            .withMessage('category is required'),
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
    ];
};
exports.addChallengeValidator = addChallengeValidator;
//# sourceMappingURL=challengeValidator.js.map