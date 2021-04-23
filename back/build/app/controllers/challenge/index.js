"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const challengeController_1 = require("./challengeController");
const challengeValidator_1 = require("../../middlewares/validators/challengeValidator");
const routes = express_1.default.Router();
routes.use(auth_1.default);
// normal user
routes.get('/getChallenges', challengeController_1.getChallenges);
routes.get('/getChallenge', challengeValidator_1.getChallengeValidator(), challengeController_1.getChallenge);
routes.post('/authFlag', challengeValidator_1.authFlagValidator(), challengeController_1.authFlag);
// admin
routes.post('/addChallenge', challengeValidator_1.addChallengeValidator(), challengeController_1.addChallenge);
routes.post('/updateChallenge', challengeValidator_1.updateChallengeValidator(), challengeController_1.updateChallenge);
routes.post('/deleteChallenge', challengeValidator_1.deleteChallengeValidator(), challengeController_1.deleteChallenge);
exports.default = routes;
//# sourceMappingURL=index.js.map