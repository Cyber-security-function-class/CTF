'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFlagValidator = exports.deleteChallengeValidator = exports.updateChallengeValidator = exports.addChallengeValidator = void 0;
var express_validator_1 = require("express-validator");
var addChallengeValidator = function () {
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
        express_validator_1.body('category_id')
            .notEmpty()
            .withMessage('category is required')
            .isNumeric()
            .withMessage("categort_id is must be number"),
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ];
};
exports.addChallengeValidator = addChallengeValidator;
var updateChallengeValidator = function () {
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
        express_validator_1.body('category_id')
            .notEmpty()
            .withMessage('category is required')
            .isNumeric()
            .withMessage("categort_id is must be number"),
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ];
};
exports.updateChallengeValidator = updateChallengeValidator;
var deleteChallengeValidator = function () {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage("id is required")
            .isNumeric()
            .withMessage("id is must be number")
    ];
};
exports.deleteChallengeValidator = deleteChallengeValidator;
var authFlagValidator = function () {
    return [
        express_validator_1.body('challenge_id')
            .notEmpty()
            .withMessage("challenge_id is required")
            .isNumeric()
            .withMessage("challenge_id is must be number"),
        express_validator_1.body('flag')
            .notEmpty()
            .withMessage("flag is required")
            .isString()
            .withMessage("flag is must be string")
    ];
};
exports.authFlagValidator = authFlagValidator;
//# sourceMappingURL=challengeValidator.js.map