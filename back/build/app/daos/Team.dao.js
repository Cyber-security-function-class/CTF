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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamDAO = void 0;
const Challenge_1 = require("../models/Challenge");
const Solved_1 = require("../models/Solved");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const user_1 = require("../utils/user");
class TeamDAO {
    constructor() {
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
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
                ],
                raw: true
            });
            return team;
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield Team_1.Team.findAll({
                attributes: ['id', 'teamName', 'score'],
                raw: true
            });
        });
        this.create = (teamInfo) => __awaiter(this, void 0, void 0, function* () {
            const hashedTeamPassword = yield user_1.createHashedPassword(teamInfo.teamPassword);
            const newTeam = yield Team_1.Team.findOrCreate({
                where: { teamName: teamInfo.teamName },
                defaults: {
                    leader: teamInfo.leaderId,
                    score: 0,
                    teamPassword: hashedTeamPassword
                }
            });
            return newTeam;
        });
    }
}
exports.TeamDAO = TeamDAO;
//# sourceMappingURL=Team.dao.js.map