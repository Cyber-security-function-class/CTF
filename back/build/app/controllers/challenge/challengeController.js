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
exports.authFlag = exports.deleteChallenge = exports.updateChallenge = exports.addChallenge = exports.getChallenge = exports.getChallenges = void 0;
var index_1 = __importDefault(require("../../models/index"));
var index_2 = require("../../error/index");
var express_validator_1 = require("express-validator");
var sequelize_1 = require("sequelize");
var Challenge = index_1.default.Challenge;
var Category = index_1.default.Category;
var Solved = index_1.default.Solved;
var User = index_1.default.User;
var getChallenges = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var challenges, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Challenge.findAll({
                        attributes: ['id', 'title', 'score', 'category'],
                        raw: true
                    })];
            case 1:
                challenges = _a.sent();
                return [2 /*return*/, res.json({ result: challenges })];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getChallenges = getChallenges;
var getChallenge = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, numId, challenge, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                numId = +id;
                if (numId === undefined || numId === NaN) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError) })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Challenge.findOne({
                        where: {
                            id: numId
                        },
                        attributes: ['id', 'title', 'content', 'score', 'category_id'],
                        raw: true,
                        include: [{
                                model: Category,
                                as: 'category'
                            }]
                    })];
            case 2:
                challenge = _a.sent();
                if (challenge !== null) {
                    return [2 /*return*/, res.json(challenge)];
                }
                else {
                    return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), "detail": "Challenge not exist" })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getChallenge = getChallenge;
var addChallenge = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, title, score, category_id, content, flag, chall, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req['decoded'].isAdmin) {
                    return [2 /*return*/, res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send()
                        // he is not a admin
                    ];
                    // he is not a admin
                }
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                _a = req.body, title = _a.title, score = _a.score, category_id = _a.category_id, content = _a.content, flag = _a.flag;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Category.findOne({ where: { id: category_id } })];
            case 2:
                if (!((_b.sent()) !== null)) return [3 /*break*/, 4];
                return [4 /*yield*/, Challenge.create({
                        title: title,
                        score: score,
                        content: content,
                        flag: flag,
                        category_id: category_id
                    })];
            case 3:
                chall = _b.sent();
                return [2 /*return*/, res.json(chall)];
            case 4: return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), "detail": "category not exist" })];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addChallenge = addChallenge;
var updateChallenge = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, id, title, content, score, flag, category_id, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req['decoded'].isAdmin) {
                    return [2 /*return*/, res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send()
                        // he is not a admin
                    ];
                    // he is not a admin
                }
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                _a = req.body, id = _a.id, title = _a.title, content = _a.content, score = _a.score, flag = _a.flag, category_id = _a.category_id;
                return [4 /*yield*/, Challenge.findOne({ where: id })];
            case 1:
                if ((_b.sent()) === null) {
                    return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "challenge doesn't exist" })];
                }
                return [4 /*yield*/, Category.findOne({ where: { id: category_id } })];
            case 2:
                if (!((_b.sent()) !== null)) return [3 /*break*/, 7];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, Challenge.update({
                        title: title,
                        content: content,
                        score: score,
                        flag: flag,
                        category_id: category_id
                    }, {
                        where: { id: id }
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json({ result: true })];
            case 5:
                err_4 = _b.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), "detail": "category not exist" })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateChallenge = updateChallenge;
var deleteChallenge = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, id, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req['decoded'].isAdmin) {
                    return [2 /*return*/, res.status(403).json(index_2.getErrorMessage(index_2.ErrorType.AccessDenied)).send()
                        // he is not a admin
                    ];
                    // he is not a admin
                }
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                id = req.body.id;
                return [4 /*yield*/, Challenge.findOne({ where: { id: id } })];
            case 1:
                if (!((_a.sent()) !== null)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Challenge.destroy({ where: { id: id } })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ result: true })];
            case 4:
                err_5 = _a.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "challenge doesn't exist" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteChallenge = deleteChallenge;
var authFlag = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, challenge_id, flag, user_id, challenge, solved, user, err_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() })];
                }
                _a = req.body, challenge_id = _a.challenge_id, flag = _a.flag;
                user_id = req['decoded'].id;
                return [4 /*yield*/, Challenge.findOne({ where: { id: challenge_id }, raw: true })];
            case 1:
                challenge = _c.sent();
                if (!(challenge !== null)) return [3 /*break*/, 12];
                if (!(flag === challenge.flag)) return [3 /*break*/, 10];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 8, , 9]);
                return [4 /*yield*/, Solved.findOne({ where: (_b = {},
                            _b[sequelize_1.Op.or] = [{ user_id: user_id }, { challenge_id: challenge_id }],
                            _b) })];
            case 3:
                if (!((_c.sent()) === null)) return [3 /*break*/, 6];
                return [4 /*yield*/, Solved.create({
                        challenge_id: challenge_id,
                        user_id: user_id,
                        score: challenge.score
                    })];
            case 4:
                solved = _c.sent();
                return [4 /*yield*/, User.findOne({ where: { id: user_id } })];
            case 5:
                user = _c.sent();
                user.increment('score', { by: challenge.score });
                return [2 /*return*/, res.json(solved)];
            case 6: return [2 /*return*/, res.status(200).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), "detail": "already solved" })];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_6 = _c.sent();
                console.log(err_6);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 9: return [3 /*break*/, 11];
            case 10: // flag incorrect
            return [2 /*return*/, res.json({ result: false })];
            case 11: return [3 /*break*/, 13];
            case 12: return [2 /*return*/, res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "challenge doesn't exist" })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.authFlag = authFlag;
//# sourceMappingURL=challengeController.js.map