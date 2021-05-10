'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.updateUser = exports.resendEmail = exports.verifyEmail = exports.getUser = exports.getUsers = exports.signIn = exports.signUp = void 0;
const config_1 = __importDefault(require("../../config/config"));
const jwt = __importStar(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const index_1 = require("../../error/index");
const sequelize_1 = require("sequelize");
const user_1 = require("../../utils/user");
const User_1 = require("../../models/User");
const Team_1 = require("../../models/Team");
const Solved_1 = require("../../models/Solved");
const EmailVerified_1 = require("../../models/EmailVerified");
const createToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    // id,nickname,password,email,score,isAdmin,isVerified
    const nickname = req.body.nickname;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = yield user_1.createHashedPassword(password);
    // await check('nickname')
    const isExistingUser = yield User_1.User.findOne({
        attributes: ['nickname', 'email'],
        where: {
            [sequelize_1.Op.or]: [{ nickname: nickname }, { email: email }]
        },
        raw: true
    });
    if (isExistingUser !== null) {
        let msg;
        if (nickname === isExistingUser.nickname) {
            msg = "The nickname already exist.";
        }
        else {
            msg = "The email already exist.";
        }
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: msg }).send();
    }
    try {
        const user = yield User_1.User.create({
            nickname: nickname,
            password: hashedPassword,
            email: email,
            score: 0,
            isAdmin: false
        });
        const token = yield createToken();
        if (user) {
            EmailVerified_1.EmailVerified.create({
                userId: user.id,
                token: token,
                isVerified: false
            });
            console.log("sending auth mail");
            user_1.send_auth_mail(email, token);
            return res.json({ result: true });
        }
        else {
            return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { email, password } = req.body;
    let user;
    try {
        user = yield User_1.User.findOne({
            where: { email: email },
            raw: true,
            attributes: ['id', 'password', 'isAdmin', 'nickname'],
            include: [{
                    model: EmailVerified_1.EmailVerified,
                    attributes: ['isVerified']
                }]
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
    if (user === null) { // user not exist
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.NotExist)).send();
    }
    else { // user exist
        const result = yield user_1.checkPassword(password, user.password); // sign in result
        if (result) { // password correct
            try {
                // make token
                const token = jwt.sign({
                    id: user.id,
                    nickname: user.nickname,
                    isAdmin: user.isAdmin,
                    emailVerified: user['emailVerified.isVerified'],
                }, req.app.get('jwt-secret'), // secret
                {
                    expiresIn: config_1.default.jwt.expiresIn
                });
                return res.json({ token: "Bearer " + token }).send();
            }
            catch (err) {
                return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError));
            }
        }
        else { // password incorrect
            return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.LoginFailed)).send();
        }
    }
});
exports.signIn = signIn;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.findAll({
            attributes: ['id', 'nickname'],
            include: [{
                    model: Team_1.Team,
                    attributes: ['id', 'teamName', 'leader']
                }],
            raw: true
        });
        res.json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    let { id } = req.query;
    try {
        const user = yield User_1.User.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'nickname', 'email', 'isAdmin'],
            include: [{
                    model: Solved_1.Solved
                }, {
                    model: Team_1.Team
                }]
        });
        if (user !== null) {
            return res.json(user);
        }
        else {
            return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "user doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.getUser = getUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { token } = req.body;
    const userId = req['decoded'].id;
    const emailVerified = yield EmailVerified_1.EmailVerified.findOne({
        where: {
            userId
        },
        attributes: ['id', 'token', 'isVerified'],
        raw: true
    });
    if (emailVerified === null) {
        console.log("unknown user try to email verify");
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
    if (!emailVerified['isVerified']) {
        try {
            if (token === emailVerified['token']) {
                yield EmailVerified_1.EmailVerified.update({ isVerified: true }, { where: { id: emailVerified['id'] } });
                const token = jwt.sign({
                    id: userId,
                    nickname: req['decoded'].nickname,
                    isAdmin: req['decoded'].isAdmin,
                    emailVerified: true
                }, req.app.get('jwt-secret'), // secret
                {
                    expiresIn: config_1.default.jwt.expiresIn
                });
                return res.json({ token: "Bearer " + token }).send();
            }
            else {
                return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: "token is not validate" });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        // already verified
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: "already verified" });
    }
});
exports.verifyEmail = verifyEmail;
const resendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req['decoded'].id;
    let user;
    try {
        user = yield User_1.User.findOne({
            where: { id: userId },
            attributes: ['id', 'email'],
            raw: true,
            include: [{
                    model: EmailVerified_1.EmailVerified,
                    as: "emailVerified"
                }]
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: index_1.getErrorMessage(index_1.ErrorType.UnexpectedError), detail: "maybe user is not Exist" });
    }
    let now = new Date();
    try {
        if (user['emailVerified.updatedAt'].valueOf() + (30 * 1000) < now.valueOf()) { // 30 second
            if (user['emailVerified.isVerified']) {
                return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: "already verified" });
            }
            const token = yield createToken();
            user_1.send_auth_mail(user.email, token);
            EmailVerified_1.EmailVerified.update({
                token
            }, {
                where: {
                    id: user['emailVerified.id']
                }
            });
            return res.json({ result: true });
        }
        else {
            return res.json({ error: index_1.getErrorMessage(index_1.ErrorType.AccessDenied), detail: "Only one mail can be sent per 30 seconds." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.resendEmail = resendEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id, nickname, email, isAdmin } = req.body;
    try {
        const isUserExist = yield User_1.User.findOne({
            where: {
                id
            },
            attributes: ['id'],
            raw: true
        });
        if (isUserExist !== null) {
            try {
                // update user
                yield User_1.User.update({
                    nickname, email, isAdmin
                }, {
                    where: {
                        id
                    }
                });
                res.json({ result: true });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
            }
        }
        else {
            return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "user not exist" }).send();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id } = req.body;
    if ((yield User_1.User.findOne({ where: { id }, raw: true, attributes: ['id'] })) !== null) {
        // user exist
        try {
            yield User_1.User.destroy({ where: { id } });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "user not exist" }).send();
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map