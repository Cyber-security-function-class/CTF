'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidator = exports.updateCategoryValidator = exports.addCategoryValidator = void 0;
var express_validator_1 = require("express-validator");
var addCategoryValidator = function () {
    return [
        express_validator_1.body('category')
            .notEmpty()
            .withMessage('category is required')
            .isString()
            .withMessage("category must be string")
    ];
};
exports.addCategoryValidator = addCategoryValidator;
var updateCategoryValidator = function () {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage('id must be number'),
        express_validator_1.body('category')
            .notEmpty()
            .withMessage('category is required')
            .isString()
            .withMessage("category must be string")
    ];
};
exports.updateCategoryValidator = updateCategoryValidator;
var deleteCategoryValidator = function () {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage('id must be number'),
    ];
};
exports.deleteCategoryValidator = deleteCategoryValidator;
//# sourceMappingURL=categoryValidator.js.map