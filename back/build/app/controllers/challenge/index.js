"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var challengeController_1 = require("./challengeController");
var challengeValidator_1 = require("../../middlewares/validators/challengeValidator");
var routes = express_1.default.Router();
routes.use(auth_1.default);
routes.get('/getChallenges', challengeController_1.getChallenges);
routes.get('/getChallenge', challengeController_1.getChallenge);
routes.post('/addChallenge', challengeValidator_1.addChallengeValidator(), challengeController_1.addChallenge);
exports.default = routes;
//# sourceMappingURL=index.js.map