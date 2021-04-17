"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsValidator = void 0;
var express_validator_1 = require("express-validator");
var resultsValidator = function (req) {
    var messages = [];
    if (!express_validator_1.validationResult(req).isEmpty()) {
        var errors = express_validator_1.validationResult(req).array();
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var i = errors_1[_i];
            messages.push(i);
        }
    }
    return messages;
};
exports.resultsValidator = resultsValidator;
//# sourceMappingURL=validatorResult.js.map