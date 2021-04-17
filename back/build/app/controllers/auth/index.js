"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userValidator_1 = require("../../middlewares/validators/userValidator");
var authController_1 = require("./authController");
var routes = express_1.default.Router();
routes.post("/signUp", userValidator_1.signUpValidator(), authController_1.signUp);
routes.post("/signIn", userValidator_1.signInValidator(), authController_1.signIn);
exports.default = routes;
//# sourceMappingURL=index.js.map