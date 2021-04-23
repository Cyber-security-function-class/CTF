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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategories = void 0;
const index_1 = require("../../error/index");
const express_validator_1 = require("express-validator");
const index_2 = __importDefault(require("../../models/index"));
const Category_1 = require("../../models/Category");
const sequelize_1 = __importDefault(require("sequelize"));
const categoryRepository = index_2.default.sequelize.getRepository(Category_1.Category);
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryRepository.findAll({
            raw: true
        });
        res.json(categories);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
});
exports.getCategories = getCategories;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req['decoded'].isAdmin) {
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.AccessDenied)).send();
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), msg: errors.array() });
    }
    const { category } = req.body;
    const Lcategory = category.toLowerCase();
    let isExistCategory;
    try {
        isExistCategory = yield categoryRepository.findOne({
            where: sequelize_1.default.where(sequelize_1.default.fn('lower', sequelize_1.default.col('category')), sequelize_1.default.fn('lower', Lcategory)),
            raw: true
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
    }
    if (isExistCategory === null) {
        const newCategory = yield categoryRepository.create({
            category: Lcategory,
        });
        return res.json({ result: true });
    }
    else {
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.AlreadyExist)).send();
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req['decoded'].isAdmin) {
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.AccessDenied)).send();
        // he is not a admin
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), msg: errors.array() });
    }
    const { id, category } = req.body;
    if ((yield categoryRepository.findOne({ where: { id }, raw: true })) !== null) {
        try {
            yield categoryRepository.update({ category }, { where: { id } });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.NotExist)).send();
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req['decoded'].isAdmin) {
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.AccessDenied)).send();
        // he is not a admin
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), msg: errors.array() });
    }
    const { id } = req.body;
    if ((yield categoryRepository.findOne({ where: { id }, raw: true })) !== null) {
        try {
            yield categoryRepository.destroy({ where: { id } });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(index_1.getErrorMessage(index_1.ErrorType.UnexpectedError)).send();
        }
    }
    else {
        return res.status(400).json(index_1.getErrorMessage(index_1.ErrorType.NotExist)).send();
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map