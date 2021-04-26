'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoticeValidator = exports.updateNoticeValidator = exports.addNoticeValidator = void 0;
const express_validator_1 = require("express-validator");
const addNoticeValidator = () => {
    return [
        express_validator_1.body('content')
            .notEmpty()
            .withMessage('category is required')
            .isObject()
            .withMessage("category must be string")
    ];
};
exports.addNoticeValidator = addNoticeValidator;
const updateNoticeValidator = () => {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage("id must be a number"),
        express_validator_1.body('content')
            .notEmpty()
            .withMessage('category is required')
            .isObject()
            .withMessage("category must be string")
    ];
};
exports.updateNoticeValidator = updateNoticeValidator;
const deleteNoticeValidator = () => {
    return [
        express_validator_1.body('id')
            .notEmpty()
            .withMessage('id is required')
            .isNumeric()
            .withMessage("id must be a number")
    ];
};
exports.deleteNoticeValidator = deleteNoticeValidator;
//# sourceMappingURL=noticeValidator.js.map