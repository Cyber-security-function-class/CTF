'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidator = exports.updateCategoryValidator = exports.addCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const addCategoryValidator = () => {
    return [
        express_validator_1.body('category')
            .notEmpty()
            .withMessage('category is required')
            .isString()
            .withMessage("category must be string")
    ];
};
exports.addCategoryValidator = addCategoryValidator;
const updateCategoryValidator = () => {
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
const deleteCategoryValidator = () => {
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