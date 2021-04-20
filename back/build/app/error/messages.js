"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __importDefault(require("./types"));
const errorMessages = {
    [types_1.default.UnexpectedError]: "An unexpected error occurred.",
    [types_1.default.ValidationError]: "The data you sent is not valid.",
    [types_1.default.LoginFailed]: "Login failed.",
    [types_1.default.AccessDenied]: "Access denied.",
    [types_1.default.AlreadyExist]: "This value already exists.",
    [types_1.default.NotExist]: "Not Exist."
};
exports.default = errorMessages;
//# sourceMappingURL=messages.js.map