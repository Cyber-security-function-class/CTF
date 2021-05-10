'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinTeam = exports.createTeam = exports.getTeams = exports.getTeam = void 0;
// import models 
const index_1 = require("../../error/index");
const express_validator_1 = require("express-validator");
const user_1 = require("../../utils/user");
const Team_1 = require("../../models/Team");
const User_1 = require("../../models/User");
const Solved_1 = require("../../models/Solved");
const Challenge_1 = require("../../models/Challenge");
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const team = yield Team_1.Team.findOne({
            where: { id },
            attributes: ['id', 'teamName', 'score'],
            include: [
                {
                    model: User_1.User,
                    attributes: ['id', 'nickname'],
                    include: [{
                            model: Solved_1.Solved,
                            attributes: ['score'],
                            required: false,
                            include: [{
                                    model: Challenge_1.Challenge,
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
            return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "team not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.getTeam = getTeam;
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield Team_1.Team.findAll({ attributes: ['id', 'teamName', 'score'] });
        return res.json(teams);
    }
    catch (err) {
        return res.status(500).json({ error: index_1.getErrorMessage(index_1.ErrorType.UnexpectedError) });
    }
});
exports.getTeams = getTeams;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { teamName, teamPassword } = req.body;
    const leaderId = req['decoded'].id;
    let leader;
    let hasTeam; // is user has team
    try {
        leader = yield User_1.User.findOne({ where: { id: leaderId }, raw: true, attributes: ['teamId'] });
        if (leader) {
            // if user has team : true 
            hasTeam = (leader.teamId !== null) ? true : false;
        }
        else { // user is not Exist, wtf?
            throw "unvalid user trying to make a team";
        }
    }
    catch (err) {
        return res.status(500).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "cannot find user.." });
    }
    if (!hasTeam) {
        const hashedTeamPassword = yield user_1.createHashedPassword(teamPassword);
        const newTeam = yield Team_1.Team.findOrCreate({
            where: { teamName },
            defaults: {
                leader: leaderId,
                score: 0,
                teamPassword: hashedTeamPassword
            }
        });
        if (newTeam[1]) { // team already exists : false
            // join to team
            yield User_1.User.update({
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
            return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: "same teamName is already exist." });
        }
    }
    else {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: "you already joined another team!" });
    }
});
exports.createTeam = createTeam;
const joinTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { teamName, teamPassword } = req.body;
    const userId = req['decoded'].id;
    try {
        const user = yield User_1.User.findOne({ where: { id: userId }, attributes: ['teamId'], raw: true });
        if (user.teamId !== null) {
            return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: "already joined a team" });
        }
        const team = yield Team_1.Team.findOne({
            where: {
                teamName
            },
            attributes: ['id', 'leader', 'teamPassword'],
            include: [{
                    model: User_1.User,
                    attributes: ['id', 'nickname']
                }]
        });
        if (team !== null) {
            // max population of team == 3
            if (team.users.length >= 3) {
                return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AccessDenied), detail: "team is full" });
            }
            if (yield user_1.checkPassword(teamPassword, team.teamPassword)) {
                yield User_1.User.update({
                    teamId: team.id,
                }, {
                    where: {
                        id: userId
                    }
                });
                return res.json({ result: true });
            }
            else {
                return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AccessDenied), detail: "password incorrect" });
            }
        }
        else {
            return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "team not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.joinTeam = joinTeam;
//# sourceMappingURL=teamController.js.map