'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const categoryController_1 = require("./categoryController");
const categoryValidator_1 = require("../../middlewares/validators/categoryValidator");
const routes = express_1.default.Router();
routes.use(auth_1.default);
routes.get('/getCategories', categoryController_1.getCategories);
routes.post('/addCategory', categoryValidator_1.addCategoryValidator(), categoryController_1.addCategory);
routes.post('/updateCategory', categoryValidator_1.updateCategoryValidator(), categoryController_1.updateCategory);
routes.post('/deleteCategory', categoryValidator_1.deleteCategoryValidator(), categoryController_1.deleteCategory);
exports.default = routes;
//# sourceMappingURL=index.js.map