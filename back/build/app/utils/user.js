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
exports.send_auth_mail = exports.checkPassword = exports.createHashedPassword = void 0;
const bcrypt_1 = require("bcrypt");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const createHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const salt = yield bcrypt_1.genSalt(saltRounds);
    const hashedPassword = yield bcrypt_1.hash(password, salt);
    return hashedPassword;
});
exports.createHashedPassword = createHashedPassword;
const checkPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordCorrect = yield bcrypt_1.compare(password, hashedPassword); // hash.toString for type checking hack
    return isPasswordCorrect;
});
exports.checkPassword = checkPassword;
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
exports.send_auth_mail = send_auth_mail;
//# sourceMappingURL=user.js.map