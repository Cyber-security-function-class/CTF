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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.signIn = exports.signUp = void 0;
var index_1 = __importDefault(require("../../models/index"));
var jwt = __importStar(require("jsonwebtoken"));
var bcrypt_1 = require("bcrypt");
var express_validator_1 = require("express-validator");
var config_1 = __importDefault(require("../../config/config"));
var sequelize_1 = require("sequelize");
var index_2 = require("../../error/index");
var User = index_1.default.User;
var createHashedPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var saltRounds, salt, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.genSalt(saltRounds)];
            case 1:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.hash(password, salt)];
            case 2:
                hashedPassword = _a.sent();
                return [2 /*return*/, hashedPassword];
        }
    });
}); };
var checkPassword = function (password, hashedPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var isPasswordCorrect;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1.compare(password, hashedPassword)]; // hash.toString for type checking hack
            case 1:
                isPasswordCorrect = _a.sent() // hash.toString for type checking hack
                ;
                return [2 /*return*/, isPasswordCorrect];
        }
    });
}); };
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, nickname, password, email, hashedPassword, isExistingUser, msg, user, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                nickname = req.body.nickname;
                password = req.body.password;
                email = req.body.email;
                return [4 /*yield*/, createHashedPassword(password)
                    // await check('nickname')
                ];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, User.findOne({
                        where: (_a = {},
                            _a[sequelize_1.Op.or] = [{ nickname: nickname }, { email: email }],
                            _a),
                        raw: true
                    })];
            case 2:
                isExistingUser = _b.sent();
                if (isExistingUser !== null) {
                    msg = void 0;
                    if (nickname === isExistingUser.nickname) {
                        msg = "The nickname already exist.";
                    }
                    else {
                        msg = "The email already exist.";
                    }
                    return [2 /*return*/, res.status(409).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: msg }).send()];
                }
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, User.create({
                        nickname: nickname,
                        password: hashedPassword,
                        email: email
                    })];
            case 4:
                user = _b.sent();
                if (user) {
                    res.json({ result: true });
                }
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, err_2, result, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ where: { email: email }, raw: true })];
            case 2:
                user = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 4:
                if (!(user === null)) return [3 /*break*/, 5];
                return [2 /*return*/, res.status(400).json(index_2.getErrorMessage(index_2.ErrorType.NotExist)).send()];
            case 5: return [4 /*yield*/, checkPassword(password, user.password)]; // sign in result
            case 6:
                result = _b.sent() // sign in result
                ;
                if (result) { // password correct
                    token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.nickname,
                        isAdmin: user.isAdmin
                    }, req.app.get('jwt-secret'), // secret
                    {
                        expiresIn: config_1.default.jwt.expiresIn
                    });
                    return [2 /*return*/, res.json({ token: token }).send()];
                }
                else { // password incorrect
                    return [2 /*return*/, res.status(400).json(index_2.getErrorMessage(index_2.ErrorType.LoginFailed)).send()];
                }
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, id, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req['decoded'].isAdmin) { // 이거 미들웨어로 만들어야할듯
                    return [2 /*return*/, res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send()];
                }
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                id = req.query.id;
                id = +id;
                console.log(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({
                        where: {
                            id: id
                        },
                        attributes: ['id', 'nickname', 'email', 'score', 'isAdmin']
                    })];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, id, nickname, email, isAdmin, score, isUserExist, updatedUser, err_4, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req['decoded'].isAdmin) {
                    return [2 /*return*/, res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send()];
                }
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                _a = req.body, id = _a.id, nickname = _a.nickname, email = _a.email, isAdmin = _a.isAdmin, score = _a.score;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, User.findOne({
                        where: {
                            id: id
                        },
                        attributes: ['id'],
                        raw: true
                    })];
            case 2:
                isUserExist = _b.sent();
                if (!(isUserExist !== null)) return [3 /*break*/, 7];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, User.update({
                        nickname: nickname,
                        email: email,
                        isAdmin: isAdmin,
                        score: score
                    }, {
                        where: {
                            id: id
                        }
                    })];
            case 4:
                updatedUser = _b.sent();
                res.json({ result: true });
                return [3 /*break*/, 6];
            case 5:
                err_4 = _b.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "user not exist" }).send()];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_5 = _b.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, id, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req['decoded'].isAdmin) {
                    return [2 /*return*/, res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send()];
                }
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                id = req.body.id;
                return [4 /*yield*/, User.findOne({ where: { id: id }, raw: true, attributes: ['id'] })];
            case 1:
                if (!((_a.sent()) !== null)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, User.destroy({ where: { id: id } })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ result: true })];
            case 4:
                err_6 = _a.sent();
                console.log(err_6);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "user not exist" }).send()];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map