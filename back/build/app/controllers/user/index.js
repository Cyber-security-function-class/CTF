"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userValidator_1 = require("../../middlewares/validators/userValidator");
var userController_1 = require("./userController");
var auth_1 = __importDefault(require("../../middlewares/auth"));
var routes = express_1.default.Router();
routes.post("/signUp", userValidator_1.signUpValidator(), userController_1.signUp);
routes.post("/signIn", userValidator_1.signInValidator(), userController_1.signIn);
// only admin
routes.get('/getUser', auth_1.default);
routes.get('/getUser', userValidator_1.getUserValidator(), userController_1.getUser);
routes.post("/updateUser", auth_1.default);
routes.post("/updateUser", userValidator_1.updateUserValidator(), userController_1.updateUser);
routes.post("/deleteUser", auth_1.default);
routes.post("/deleteUser", userValidator_1.deleteUserValidator(), userController_1.deleteUser);
exports.default = routes;
//# sourceMappingURL=index.js.map