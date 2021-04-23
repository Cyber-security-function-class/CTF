"use strict";
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
exports.resendEmail = exports.verifyEmail = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.signIn = exports.signUp = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const config_1 = __importDefault(require("../../config/config"));
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../../models/index"));
const index_2 = require("../../error/index");
const User_1 = require("../../models/User");
const Solved_1 = require("../../models/Solved");
const Team_1 = require("../../models/Team");
const EmailVerified_1 = require("../../models/EmailVerified");
const nodemailer_1 = __importDefault(require("nodemailer"));
const teamRepository = index_1.default.sequelize.getRepository(Team_1.Team);
const userRepository = index_1.default.sequelize.getRepository(User_1.User);
const solvedRepository = index_1.default.sequelize.getRepository(Solved_1.Solved);
const emailVerifiedRepository = index_1.default.sequelize.getRepository(EmailVerified_1.EmailVerified);
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
const createToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
});
const transporter = nodemailer_1.default.createTransport({
    service: config_1.default.mail.service,
    host: config_1.default.mail.host,
    auth: {
        user: config_1.default.mail.user,
        pass: config_1.default.mail.pass
    }
});
const send_auth_mail = (email, token) => {
    const mailOptions = {
        from: config_1.default.mail.user,
        to: email,
        subject: '이메일 인증',
        text: '가입완료를 위해 <' + token + '> 를 입력해주세요!'
    };
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("auth mail to ", email);
        }
    });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    // id,nickname,password,email,score,isAdmin,isVerified
    const nickname = req.body.nickname;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = yield createHashedPassword(password);
    // await check('nickname')
    const isExistingUser = yield userRepository.findOne({
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
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: msg }).send();
    }
    try {
        const user = yield userRepository.create({
            nickname: nickname,
            password: hashedPassword,
            email: email,
            score: 0,
            isAdmin: false
        });
        const token = yield createToken();
        if (user) {
            emailVerifiedRepository.create({
                userId: user.id,
                token: token,
                isVerified: false
            });
            console.log("sending auth mail");
            send_auth_mail(email, token);
            return res.json({ result: true });
        }
        else {
            return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { email, password } = req.body;
    let user;
    try {
        user = yield userRepository.findOne({
            where: { email: email },
            raw: true,
            attributes: ['id', 'password', 'isAdmin', 'nickname'],
            include: [{
                    model: emailVerifiedRepository,
                    attributes: ['isVerified']
                }]
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
    if (user === null) { // user not exist
        return res.status(400).json(index_2.getErrorMessage(index_2.ErrorType.NotExist)).send();
    }
    else { // user exist
        const result = yield checkPassword(password, user.password); // sign in result
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
                return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError));
            }
        }
        else { // password incorrect
            return res.status(400).json(index_2.getErrorMessage(index_2.ErrorType.LoginFailed)).send();
        }
    }
});
exports.signIn = signIn;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.findAll({
            attributes: ['id', 'nickname'],
            include: [{
                    model: teamRepository,
                    attributes: ['id', 'teamName', 'leader']
                }],
            raw: true
        });
        res.json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    let { id } = req.query;
    try {
        const user = yield userRepository.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'nickname', 'email', 'isAdmin'],
            include: [{
                    model: solvedRepository
                }, {
                    model: teamRepository
                }]
        });
        if (user !== null) {
            return res.json(user);
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "user doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req['decoded'].isAdmin) {
        return res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send();
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id, nickname, email, isAdmin } = req.body;
    try {
        const isUserExist = yield userRepository.findOne({
            where: {
                id
            },
            attributes: ['id'],
            raw: true
        });
        if (isUserExist !== null) {
            try {
                // update user
                yield userRepository.update({
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
                return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
            }
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "user not exist" }).send();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req['decoded'].isAdmin) {
        return res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send();
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id } = req.body;
    if ((yield userRepository.findOne({ where: { id }, raw: true, attributes: ['id'] })) !== null) {
        // user exist
        try {
            yield userRepository.destroy({ where: { id } });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "user not exist" }).send();
    }
});
exports.deleteUser = deleteUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { token } = req.body;
    const userId = req['decoded'].id;
    const emailVerified = yield emailVerifiedRepository.findOne({
        where: {
            userId
        },
        attributes: ['id', 'token', 'isVerified'],
        raw: true
    });
    if (emailVerified === null) {
        console.log("unknown user try to email verify");
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
    if (!emailVerified['isVerified']) {
        try {
            if (token === emailVerified['token']) {
                yield emailVerifiedRepository.update({ isVerified: true }, { where: { id: emailVerified['id'] } });
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
                return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: "token is not validate" });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        // already verified
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "already verified" });
    }
});
exports.verifyEmail = verifyEmail;
const resendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req['decoded'].id;
    let user;
    try {
        user = yield userRepository.findOne({
            where: { id: userId },
            raw: true,
            include: [{
                    model: emailVerifiedRepository
                }]
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: index_2.getErrorMessage(index_2.ErrorType.UnexpectedError), detail: "maybe user is not Exist" });
    }
    let now = new Date();
    if (user.updatedAt.valueOf() + (30 * 1000) < now.valueOf()) { // 30 second
        if (user.emailVerified.isVerified) {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "already verified" });
        }
        const token = yield createToken();
        send_auth_mail(user.email, token);
        emailVerifiedRepository.update({
            token
        }, {
            where: {
                id: user.emailVerified.id
            }
        });
        res.json({ result: true });
    }
    else {
        res.json({ error: index_2.getErrorMessage(index_2.ErrorType.AccessDenied), detail: "Only one mail can be sent per 30 seconds." });
    }
});
exports.resendEmail = resendEmail;
//# sourceMappingURL=userController.js.map