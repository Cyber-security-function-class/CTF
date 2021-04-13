"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var strong_error_handler_1 = __importDefault(require("strong-error-handler"));
var routes_1 = __importDefault(require("./app/routes"));
var app = express_1.default();
// app.use(bodyParser.json({limit: '5mb'}))
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express_1.default.json({ limit: "2mb" }));
app.use("", routes_1.default);
app.use(strong_error_handler_1.default({
    debug: process.env.ENV !== 'prod',
    log: true,
}));
exports.default = app;
//# sourceMappingURL=app.js.map