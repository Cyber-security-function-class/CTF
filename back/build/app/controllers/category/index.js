'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var categoryController_1 = require("./categoryController");
var categoryValidator_1 = require("../../middlewares/validators/categoryValidator");
var routes = express_1.default.Router();
routes.use(auth_1.default);
routes.get('/getCategories', categoryController_1.getCategories);
routes.post('/addCategory', categoryValidator_1.addCategoryValidator(), categoryController_1.addCategory);
exports.default = routes;
//# sourceMappingURL=index.js.map