"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinTeam = exports.createTeam = exports.getTeams = exports.getTeam = void 0;
const index_1 = __importDefault(require("../../models/index"));
const Team_1 = require("../../models/Team");
const User_1 = require("../../models/User");
const index_2 = require("../../error/index");
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const Solved_1 = require("../../models/Solved");
const Challenge_1 = require("../../models/Challenge");
const teamRepository = index_1.default.sequelize.getRepository(Team_1.Team);
const userRepository = index_1.default.sequelize.getRepository(User_1.User);
const solvedRepository = index_1.default.sequelize.getRepository(Solved_1.Solved);
const challengeRepository = index_1.default.sequelize.getRepository(Challenge_1.Challenge);
const createHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const salt = yield bcrypt_1.genSalt(saltRounds);
    const hashedPassword = yield bcrypt_1.hash(password, salt);
    return hashedPassword;
});
const checkPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordCorrect = yield bcrypt_1.compare(password, hashedPassword); // hash.toString for type checking hack
    return isPasswordCorrect;
});
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const team = yield teamRepository.findOne({
            where: { id },
            attributes: ['id', 'teamName', 'score'],
            include: [
                {
                    model: userRepository,
                    attributes: ['id', 'nickname'],
                    include: [{
                            model: solvedRepository,
                            attributes: ['score'],
                            required: false,
                            include: [{
                                    model: challengeRepository,
                                    attributes: ['id', 'title']
                                }]
                        }],
                    required: false
                }
            ]
        });
        if (team !== null) {
            return res.json(team);
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "team not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.getTeam = getTeam;
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield teamRepository.findAll({ attributes: ['id', 'teamName', 'score'] });
        return res.json(teams);
    }
    catch (err) {
        return res.status(500).json({ error: index_2.getErrorMessage(index_2.ErrorType.UnexpectedError) });
    }
});
exports.getTeams = getTeams;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { teamName, teamPassword } = req.body;
    const leaderId = req['decoded'].id;
    let leader;
    let hasTeam; // is user has team
    try {
        leader = yield userRepository.findOne({ where: { id: leaderId }, raw: true, attributes: ['teamId'] });
        if (leader) {
            // if user has team : true 
            hasTeam = (leader.teamId !== null) ? true : false;
        }
        else { // user is not Exist, wtf?
            throw "unvalid user trying to make a team";
        }
    }
    catch (err) {
        return res.status(500).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "cannot find user.." });
    }
    if (!hasTeam) {
        const hashedTeamPassword = yield createHashedPassword(teamPassword);
        const newTeam = yield teamRepository.findOrCreate({
            where: { teamName },
            defaults: {
                leader: leaderId,
                score: 0,
                teamPassword: hashedTeamPassword
            }
        });
        if (newTeam[1]) { // team already exists : false
            // join to team
            yield userRepository.update({
                teamId: newTeam[0].id
            }, {
                where: { id: leaderId },
            });
            return res.json({
                result: newTeam[1],
                team: {
                    id: newTeam[0].id,
                    teamName: newTeam[0].teamName
                }
            });
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "same teamName is already exist." });
        }
    }
    else {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "you already joined another team!" });
    }
});
exports.createTeam = createTeam;
const joinTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { teamName, teamPassword } = req.body;
    const userId = req['decoded'].id;
    try {
        const user = yield userRepository.findOne({ where: { id: userId }, attributes: ['teamId'], raw: true });
        if (user.teamId !== null) {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "already joined a team" });
        }
        const team = yield teamRepository.findOne({
            where: {
                teamName
            },
            attributes: ['id', 'leader', 'teamPassword'],
            include: [{
                    model: userRepository,
                    attributes: ['id', 'nickname']
                }]
        });
        if (team !== null) {
            // max population of team == 3
            if (team.users.length >= 3) {
                return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AccessDenied), detail: "team is full" });
            }
            if (yield checkPassword(teamPassword, team.teamPassword)) {
                yield userRepository.update({
                    teamId: team.id,
                }, {
                    where: {
                        id: userId
                    }
                });
                return res.json({ result: true });
            }
            else {
                return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AccessDenied), detail: "password incorrect" });
            }
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "team not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.joinTeam = joinTeam;
//# sourceMappingURL=teamController.js.map