'use strict';
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
exports.deleteNotice = exports.updateNotice = exports.addNotice = exports.getNotices = exports.getCurrentNotice = void 0;
const express_validator_1 = require("express-validator");
const error_1 = require("../../error");
const Notice_1 = require("../../models/Notice");
const getCurrentNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notice = yield Notice_1.Notice.findOne({
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
        const notice = yield Notice_1.Notice.findAll({ raw: true });
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
        yield Notice_1.Notice.create({ content });
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
        if ((yield Notice_1.Notice.findOne({ where: { id } })) !== null) {
            yield Notice_1.Notice.update({ content }, { where: { id } });
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
        if ((yield Notice_1.Notice.findOne({ where: { id } })) !== null) {
            yield Notice_1.Notice.destroy({ where: { id } });
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