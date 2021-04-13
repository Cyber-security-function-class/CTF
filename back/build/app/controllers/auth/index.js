"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("./authController"));
var routes = express_1.default.Router();
routes.post('/signUp', authController_1.default.signUp);
exports.default = routes;
//# sourceMappingURL=index.js.map