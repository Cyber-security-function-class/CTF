"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __importDefault(require("./messages"));
const getErrorMessage = (errorType) => {
    const response = { "errorType": errorType, "msg": messages_1.default[errorType] };
    return response;
};
exports.default = getErrorMessage;
//# sourceMappingURL=error.js.map