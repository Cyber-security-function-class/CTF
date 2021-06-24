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
exports.UserDAO = void 0;
const User_1 = require("../models/User");
const EmailVerified_1 = require("../models/EmailVerified");
const Team_1 = require("../models/Team");
const user_1 = require("../utils/user");
const sequelize_1 = require("sequelize");
const error_1 = require("../error");
const Solved_1 = require("../models/Solved");
class UserDAO {
    constructor() {
        this.create = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield user_1.createHashedPassword(userInfo.password);
            const user = yield User_1.User.create({
                nickname: userInfo.nickname,
                password: hashedPassword,
                email: userInfo.email
            });
            return user;
        });
        this.validateUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { email: email },
                raw: true,
                attributes: ['id', 'password', 'isAdmin', 'nickname'],
                include: [{
                        model: EmailVerified_1.EmailVerified,
                        attributes: ['isVerified']
                    }]
            });
            if (user) {
                if (yield user_1.checkPassword(password, user.password)) {
                    return user;
                }
            }
            return null;
        });
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({
                where: {
                    id: id
                },
                attributes: ['id', 'nickname', 'email', 'isAdmin'],
                include: [{
                        model: Solved_1.Solved
                    }, {
                        model: Team_1.Team
                    }],
                raw: true
            });
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findAll({
                attributes: ['id', 'nickname'],
                include: [{
                        model: Team_1.Team,
                        attributes: ['id', 'teamName', 'leader']
                    }],
                raw: true
            });
        });
        this.update = (id, userInfo) => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.update({ userInfo }, { where: { id: userInfo.id } });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            if ((yield User_1.User.findOne({ where: { id }, raw: true, attributes: ['id'] })) !== null) {
                yield User_1.User.destroy({ where: { id: id } });
                return true;
            }
            else {
                return false;
            }
        });
        this.checkDuplicateUser = (nickname, email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                attributes: ['nickname', 'email'],
                where: {
                    [sequelize_1.Op.or]: [{ nickname: nickname }, { email: email }]
                },
                raw: true
            });
            if (user !== null) {
                let msg;
                if (nickname === user.nickname) {
                    msg = "The nickname already exist.";
                }
                else {
                    msg = "The email already exist.";
                }
                return { error: error_1.getErrorMessage(error_1.ErrorType.AlreadyExist), detail: msg };
            }
            return null;
        });
    }
}
exports.UserDAO = UserDAO;
//# sourceMappingURL=User.dao.js.map