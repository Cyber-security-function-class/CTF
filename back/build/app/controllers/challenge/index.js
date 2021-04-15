"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var challengeController_1 = require("./challengeController");
var routes = express_1.default.Router();
routes.get('/getChallenges', auth_1.default);
routes.get('/getChallenges', challengeController_1.getChallenges);
exports.default = routes;
//# sourceMappingURL=index.js.map