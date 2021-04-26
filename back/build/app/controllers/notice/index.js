"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_1 = __importDefault(require("../../middlewares/admin"));
const noticeValidator_1 = require("../../middlewares/validators/noticeValidator");
const noticeController_1 = require("./noticeController");
const routes = express_1.default.Router();
routes.get("/getNotice", noticeValidator_1.getNoticeValidator(), noticeController_1.getNotice);
routes.get("/getNotices", noticeController_1.getNotices);
routes.post("/addNotice", auth_1.default, admin_1.default, noticeValidator_1.addNoticeValidator(), noticeController_1.addNotice);
routes.post("/updateNotice", auth_1.default, admin_1.default, noticeValidator_1.updateNoticeValidator(), noticeController_1.updateNotice);
routes.post("/deleteNotice", auth_1.default, admin_1.default, noticeValidator_1.deleteNoticeValidator(), noticeController_1.deleteNotice);
exports.default = routes;
//# sourceMappingURL=index.js.map