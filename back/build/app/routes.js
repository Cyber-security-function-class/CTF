'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./controllers/user"));
var challenge_1 = __importDefault(require("./controllers/challenge"));
var category_1 = __importDefault(require("./controllers/category"));
var router = express_1.default.Router();
router.use('/api/user', user_1.default);
router.use('/api/challenge', challenge_1.default);
router.use('/api/category', category_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map