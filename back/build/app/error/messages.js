"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __importDefault(require("./types"));
var errorMessages = (_a = {},
    _a[types_1.default.UnexpectedError] = "An unexpected error occurred.",
    _a[types_1.default.ValidationError] = "The data you sent is not valid.",
    _a[types_1.default.LoginFailed] = "Login failed.",
    _a[types_1.default.AccessDenied] = "Access denied.",
    _a[types_1.default.AlreadyExist] = "This value already exists.",
    _a[types_1.default.NotExist] = "Not Exist.",
    _a);
exports.default = errorMessages;
//# sourceMappingURL=messages.js.map