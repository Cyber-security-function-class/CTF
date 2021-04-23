'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./controllers/user"));
const challenge_1 = __importDefault(require("./controllers/challenge"));
const category_1 = __importDefault(require("./controllers/category"));
const router = express_1.default.Router();
router.use('/api/user', user_1.default);
router.use('/api/challenge', challenge_1.default);
router.use('/api/category', category_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map