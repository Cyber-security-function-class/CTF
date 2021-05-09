'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidator = exports.updateCategoryValidator = exports.addCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validators = {
    id: express_validator_1.body('id')
        .notEmpty()
        .withMessage('id is required')
        .isNumeric()
        .withMessage('id must be number'),
    category: express_validator_1.body('category')
        .notEmpty()
        .withMessage('category is required')
        .isString()
        .withMessage("category must be string")
};
const addCategoryValidator = () => {
    return [
        validators.category
    ];
};
exports.addCategoryValidator = addCategoryValidator;
const updateCategoryValidator = () => {
    return [
        validators.id,
        validators.category
    ];
};
exports.updateCategoryValidator = updateCategoryValidator;
const deleteCategoryValidator = () => {
    return [
        validators.id
    ];
};
exports.deleteCategoryValidator = deleteCategoryValidator;
//# sourceMappingURL=categoryValidator.js.map