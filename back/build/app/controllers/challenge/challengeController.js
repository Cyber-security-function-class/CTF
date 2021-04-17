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
exports.addChallenge = exports.getChallenge = exports.getChallenges = void 0;
var index_1 = __importDefault(require("../../models/index"));
var index_2 = require("../../error/index");
var express_validator_1 = require("express-validator");
var Challenge = index_1.default.Challenge;
var Category = index_1.default.Category;
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
                res.json(challenge);
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
                    return [2 /*return*/, res.status(422).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), msg: errors.array() })];
                }
                _a = req.body, title = _a.title, score = _a.score, category_id = _a.category_id, content = _a.content, flag = _a.flag;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Challenge.create({
                        title: title,
                        score: 200,
                        content: content,
                        flag: flag,
                        category_id: category_id
                    })];
            case 2:
                chall = _b.sent();
                res.json(chall);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addChallenge = addChallenge;
//# sourceMappingURL=challengeController.js.map