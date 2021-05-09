'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoticeValidator = exports.updateNoticeValidator = exports.addNoticeValidator = void 0;
const express_validator_1 = require("express-validator");
const validators = {
    id: express_validator_1.body('id')
        .notEmpty()
        .withMessage('id is required')
        .isNumeric()
        .withMessage("id must be a number"),
    content: express_validator_1.body('content')
        .notEmpty()
        .withMessage('category is required')
        .isObject()
        .withMessage("category must be string")
};
const addNoticeValidator = () => {
    return [
        validators.content
    ];
};
exports.addNoticeValidator = addNoticeValidator;
const updateNoticeValidator = () => {
    return [
        validators.id,
        validators.content,
    ];
};
exports.updateNoticeValidator = updateNoticeValidator;
const deleteNoticeValidator = () => {
    return [
        validators.id
    ];
};
exports.deleteNoticeValidator = deleteNoticeValidator;
//# sourceMappingURL=noticeValidator.js.map