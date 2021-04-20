"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsValidator = void 0;
const express_validator_1 = require("express-validator");
const resultsValidator = (req) => {
    const messages = [];
    if (!express_validator_1.validationResult(req).isEmpty()) {
        const errors = express_validator_1.validationResult(req).array();
        for (const i of errors) {
            messages.push(i);
        }
    }
    return messages;
};
exports.resultsValidator = resultsValidator;
//# sourceMappingURL=validatorResult.js.map