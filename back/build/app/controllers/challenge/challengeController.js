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
exports.authFlag = exports.deleteChallenge = exports.updateChallenge = exports.addChallenge = exports.getChallenge = exports.getChallenges = void 0;
const index_1 = __importDefault(require("../../models/index"));
const index_2 = require("../../error/index");
const express_validator_1 = require("express-validator");
const sequelize_1 = require("sequelize");
const Challenge_1 = require("../../models/Challenge");
const Category_1 = require("../../models/Category");
const Solved_1 = require("../../models/Solved");
const User_1 = require("../../models/User");
const Team_1 = require("../../models/Team");
const challengeRepository = index_1.default.sequelize.getRepository(Challenge_1.Challenge);
const categoryRepository = index_1.default.sequelize.getRepository(Category_1.Category);
const solvedRepository = index_1.default.sequelize.getRepository(Solved_1.Solved);
const userRepository = index_1.default.sequelize.getRepository(User_1.User);
const teamRepository = index_1.default.sequelize.getRepository(Team_1.Team);
const getChallenges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query['category'];
    try {
        let challenges;
        if (!category) {
            challenges = yield challengeRepository.findAll({
                attributes: ['id', 'title', 'score', 'categoryId'],
                include: [{
                        model: categoryRepository,
                        as: 'category',
                        attributes: ['category']
                    }],
                raw: true
            });
            return res.json(challenges);
        }
        else {
            let f = [];
            new Promise((resolve) => {
                const filterList = category.toString().split(',');
                filterList.forEach((e, i) => {
                    let tmp = parseInt(e);
                    if (!isNaN(tmp)) {
                        f.push({ "categoryId": tmp });
                    }
                    if (i >= filterList.length - 1) {
                        resolve(f);
                    }
                });
            }).then((f) => __awaiter(void 0, void 0, void 0, function* () {
                challenges = yield challengeRepository.findAll({
                    where: {
                        [sequelize_1.Op.or]: f
                    },
                    attributes: ['id', 'title', 'score', 'categoryId'],
                    include: [{
                            model: categoryRepository,
                            as: 'category',
                            attributes: ['category']
                        }],
                    raw: true
                });
                return res.json(challenges);
            })).catch(err => {
                console.log(err);
                return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.getChallenges = getChallenges;
const getChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get by challenge id
    const { id } = req.query;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    try {
        const challenge = yield challengeRepository.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'title', 'content', 'score', 'categoryId'],
            raw: true,
            include: [{
                    model: categoryRepository,
                    as: 'category'
                }]
        });
        if (challenge !== null) {
            return res.json(challenge);
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), "detail": "Challenge not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: index_2.getErrorMessage(index_2.ErrorType.UnexpectedError) });
    }
});
exports.getChallenge = getChallenge;
const addChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { title, score, categoryId, content, flag } = req.body;
    try {
        if ((yield categoryRepository.findOne({ where: { id: categoryId } })) !== null) {
            if ((yield challengeRepository.findOne({ where: { flag } })) !== null) {
                return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "The same flag already exist." });
            }
            yield challengeRepository.create({
                title,
                score,
                content,
                flag,
                categoryId,
            });
            return res.json({ result: true });
        }
        else {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), "detail": "category not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
    }
});
exports.addChallenge = addChallenge;
const updateChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id, title, content, score, flag, categoryId } = req.body;
    if ((yield challengeRepository.findOne({ where: id })) === null) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "challenge doesn't exist" });
    }
    if ((yield categoryRepository.findOne({ where: { id: categoryId } })) !== null) {
        try {
            yield challengeRepository.update({
                title,
                content,
                score,
                flag,
                categoryId
            }, {
                where: { id }
            });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), "detail": "category not exist" });
    }
});
exports.updateChallenge = updateChallenge;
const deleteChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id } = req.body;
    if ((yield challengeRepository.findOne({ where: { id } })) !== null) {
        try {
            yield challengeRepository.destroy({ where: { id } });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_2.getErrorMessage(index_2.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.NotExist), detail: "challenge doesn't exist" });
    }
});
exports.deleteChallenge = deleteChallenge;
const authFlag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.ValidationError), detail: errors.array() });
    }
    const userId = req['decoded'].id;
    const { flag } = req.body;
    const user = yield userRepository.findOne({
        where: { id: userId }, raw: true,
        include: [{
                model: teamRepository,
                attributes: ['id']
            }]
    });
    if (user === null) {
        return res.status(500).json({ error: index_2.getErrorMessage(index_2.ErrorType.UnexpectedError) });
    }
    const teamId = user['team.id'];
    const challenge = yield challengeRepository.findOne({ where: { flag }, raw: true });
    if (challenge !== null && teamId !== null) {
        // flag is correct
        const solved = yield solvedRepository.findOrCreate({
            where: {
                teamId,
                challengeId: challenge.id
            },
            defaults: {
                userId,
                score: challenge.score
            }
        });
        if (solved[1]) { // solved
            yield teamRepository.update({ score: sequelize_1.Sequelize.literal('score + ' + challenge.score) }, { where: { id: teamId } });
            return res.json({ result: true });
        }
        else { // already solved
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AlreadyExist), detail: "already solved" });
        }
    }
    else {
        if (teamId === null) {
            return res.status(400).json({ error: index_2.getErrorMessage(index_2.ErrorType.AccessDenied), detail: "you have to join a team before submit flag." });
        }
        res.json({ result: false }); // flag is wrong
    }
});
exports.authFlag = authFlag;
//# sourceMappingURL=challengeController.js.map