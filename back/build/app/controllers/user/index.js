"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidator_1 = require("../../middlewares/validators/userValidator");
const teamValidator_1 = require("../../middlewares/validators/teamValidator");
const userController_1 = require("./userController");
const teamController_1 = require("./teamController");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const routes = express_1.default.Router();
routes.post("/signUp", userValidator_1.signUpValidator(), userController_1.signUp);
routes.post("/signIn", userValidator_1.signInValidator(), userController_1.signIn);
routes.get('/getUser', auth_1.default);
routes.get('/getUser', userValidator_1.getUserValidator(), userController_1.getUser);
routes.get('/getUsers', auth_1.default);
routes.get('/getUsers', userController_1.getUsers);
routes.get('/getUsers', auth_1.default);
routes.post("/verifyEmail", auth_1.default);
routes.post("/verifyEmail", userValidator_1.verifyEmailValidator(), userController_1.verifyEmail);
routes.post("/resendEmail", auth_1.default);
routes.post("/resendEmail", userController_1.resendEmail);
routes.post('/createTeam', auth_1.default);
routes.post('/createTeam', teamValidator_1.createTeamValidator(), teamController_1.createTeam);
routes.get('/getTeam', auth_1.default);
routes.get('/getTeam', teamValidator_1.getTeamValidator(), teamController_1.getTeam);
routes.get('/getTeams', auth_1.default);
routes.get('/getTeams', teamController_1.getTeams);
routes.post("/joinTeam", auth_1.default);
routes.post("/joinTeam", teamValidator_1.joinTeamValidator(), teamController_1.joinTeam);
// only admin
routes.post("/updateUser", auth_1.default);
routes.post("/updateUser", userValidator_1.updateUserValidator(), userController_1.updateUser);
routes.post("/deleteUser", auth_1.default);
routes.post("/deleteUser", userValidator_1.deleteUserValidator(), userController_1.deleteUser);
exports.default = routes;
//# sourceMappingURL=index.js.map