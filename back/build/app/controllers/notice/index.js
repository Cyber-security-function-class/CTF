"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const noticeController_1 = require("./noticeController");
const routes = express_1.default.Router();
routes.get("/getNotice", noticeController_1.getNotice);
routes.get("/getNotices", noticeController_1.getNotices);
routes.post("/createNotice", auth_1.default, noticeController_1.createNotice);
routes.post("/updateNotice", auth_1.default, noticeController_1.updateNotice);
routes.post("/deleteNotice", auth_1.default, noticeController_1.deleteNotice);
exports.default = routes;
//# sourceMappingURL=index.js.map