'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoryValidator = void 0;
var express_validator_1 = require("express-validator");
var addCategoryValidator = function () {
    return [
        express_validator_1.body('category').notEmpty().withMessage('category is required')
    ];
};
exports.addCategoryValidator = addCategoryValidator;
//# sourceMappingURL=categoryValidator.js.map