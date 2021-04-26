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
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategories = void 0;
const index_1 = require("../../error/index");
const express_validator_1 = require("express-validator");
const index_2 = __importDefault(require("../../models/index"));
const Category_1 = require("../../models/Category");
const sequelize_1 = __importStar(require("sequelize"));
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
        yield categoryRepository.create({
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
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.ValidationError), msg: errors.array() });
    }
    const { id, category } = req.body;
    const Lcategory = category.toLowerCase();
    const beforeUpdate = yield categoryRepository.findAll({
        where: { [sequelize_1.Op.or]: [
                { id: id },
                { category: sequelize_1.default.where(sequelize_1.default.fn('lower', Lcategory), sequelize_1.default.fn('lower', sequelize_1.default.col('category'))) }
            ]
        },
        raw: true
    });
    console.log("before update : ", beforeUpdate);
    let isCategoryOverlap;
    let isIdExist;
    beforeUpdate.find(e => {
        // check if the category field is overlap with another category
        ((e.category.toLowerCase() === Lcategory)) ? isCategoryOverlap = true : isCategoryOverlap = isCategoryOverlap;
        ((e.id === id)) ? isIdExist = true : isIdExist = isIdExist;
    });
    console.log("isCategoryOverlap ", isCategoryOverlap);
    console.log("isIdExist ", isIdExist);
    if (isCategoryOverlap) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.AlreadyExist), detail: "this category is already exist" }).send();
    }
    else if (!isIdExist) {
        return res.status(400).json({ error: index_1.getErrorMessage(index_1.ErrorType.NotExist), detail: "this id is not exist" }).send();
    }
    else {
        try {
            yield categoryRepository.update({ category }, { where: { id } });
            return res.json({ result: true });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: index_1.getErrorMessage(index_1.ErrorType.UnexpectedError), detail: "UnexpectedError" }).send();
        }
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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