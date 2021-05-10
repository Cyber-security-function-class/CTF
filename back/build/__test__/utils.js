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
exports.joinTeam = exports.createTeam = exports.makeAdmin = exports.verifyEmails = exports.login = exports.register = exports.getDecoded = void 0;
// test code modules
const request_1 = __importDefault(require("request"));
const sequelize_1 = require("sequelize");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const EmailVerified_1 = require("../app/models/EmailVerified");
const User_1 = require("../app/models/User");
const ADDRESS = "http://localhost";
const PORT = process.env.PORT || 7000;
const BASEURI = ADDRESS + ":" + PORT;
const getDecoded = (token) => {
    return jwt_decode_1.default(token.split(' ')[1]);
};
exports.getDecoded = getDecoded;
const register = (userInfo) => {
    return new Promise((resolve, reject) => {
        request_1.default.post(BASEURI + "/api/user/signUp", {
            body: userInfo,
            json: true
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (body === null || body === void 0 ? void 0 : body.result) {
                resolve(body === null || body === void 0 ? void 0 : body.result);
            }
            else {
                resolve(false);
            }
        });
    });
};
exports.register = register;
const login = (userInfo) => {
    return new Promise((resolve, reject) => {
        request_1.default.post(BASEURI + "/api/user/signIn", {
            body: userInfo,
            json: true
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve({ err, res, body });
        });
    });
};
exports.login = login;
const verifyEmails = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield EmailVerified_1.EmailVerified.findAll({ raw: true, attributes: ['id'] });
        yield EmailVerified_1.EmailVerified.update({ isVerified: true }, { where: { [sequelize_1.Op.or]: result } });
        resolve(true);
    }));
};
exports.verifyEmails = verifyEmails;
const makeAdmin = (userId) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield User_1.User.update({ isAdmin: true }, { where: { id: userId } });
        if (result[0] == [1]) {
            resolve(true);
            return;
        }
        reject(false);
    }));
};
exports.makeAdmin = makeAdmin;
const createTeam = (token, teamInfo) => {
    return new Promise((resolve, reject) => {
        request_1.default.post(BASEURI + "/api/user/createTeam", {
            headers: {
                Authorization: token
            },
            body: teamInfo,
            json: true
        }, (err, res, body) => {
            if (body === null || body === void 0 ? void 0 : body.result) {
                resolve(body === null || body === void 0 ? void 0 : body.result);
            }
            else {
                reject(false);
            }
        });
    });
};
exports.createTeam = createTeam;
const joinTeam = (token, teamInfo) => {
    return new Promise((resolve, reject) => {
        request_1.default.post(BASEURI + "/api/user/joinTeam", {
            headers: {
                Authorization: token
            },
            body: {
                teamName: teamInfo.teamName,
                teamPassword: teamInfo.teamPassword
            },
            json: true
        }, (err, res, body) => {
            if (body === null || body === void 0 ? void 0 : body.result) {
                resolve(body === null || body === void 0 ? void 0 : body.result);
            }
            else {
                reject(false);
            }
        });
    });
};
exports.joinTeam = joinTeam;
//# sourceMappingURL=utils.js.map