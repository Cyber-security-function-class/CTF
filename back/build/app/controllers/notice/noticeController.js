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
exports.deleteNotice = exports.updateNotice = exports.addNotice = exports.getNotices = exports.getCurrentNotice = void 0;
const express_validator_1 = require("express-validator");
const error_1 = require("../../error");
const index_1 = __importDefault(require("../../models/index"));
const Notice_1 = require("../../models/Notice");
const noticeRepository = index_1.default.sequelize.getRepository(Notice_1.Notice);
const getCurrentNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notice = yield noticeRepository.findOne({
            order: [['createdAt', 'DESC']],
            raw: true
        });
        return res.json(notice);
    }
    catch (err) {
        console.log(err);
        return res.json({ error: error_1.getErrorMessage(error_1.ErrorType.UnexpectedError) });
    }
});
exports.getCurrentNotice = getCurrentNotice;
const getNotices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notice = yield noticeRepository.findAll({ raw: true });
        return res.json(notice);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: error_1.getErrorMessage(error_1.ErrorType.UnexpectedError) });
    }
});
exports.getNotices = getNotices;
const addNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: error_1.getErrorMessage(error_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { content } = req.body;
    try {
        yield noticeRepository.create({ content });
        return res.json({ result: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: error_1.getErrorMessage(error_1.ErrorType.UnexpectedError) });
    }
});
exports.addNotice = addNotice;
const updateNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: error_1.getErrorMessage(error_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id, content } = req.body;
    try {
        if ((yield noticeRepository.findOne({ where: { id } })) !== null) {
            yield noticeRepository.update({ content }, { where: { id } });
            return res.json({ result: true });
        }
        else {
            return res.status(400).json({ error: error_1.getErrorMessage(error_1.ErrorType.NotExist), detail: "the notice that match with id is not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(error_1.getErrorMessage(error_1.ErrorType.UnexpectedError)).send();
    }
});
exports.updateNotice = updateNotice;
const deleteNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: error_1.getErrorMessage(error_1.ErrorType.ValidationError), detail: errors.array() });
    }
    const { id } = req.body;
    try {
        if ((yield noticeRepository.findOne({ where: { id } })) !== null) {
            yield noticeRepository.destroy({ where: { id } });
            return res.json({ result: true });
        }
        else {
            return res.status(400).json({ error: error_1.getErrorMessage(error_1.ErrorType.NotExist), detail: "the notice that match with id is not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(error_1.getErrorMessage(error_1.ErrorType.UnexpectedError)).send();
    }
});
exports.deleteNotice = deleteNotice;
//# sourceMappingURL=noticeController.js.map