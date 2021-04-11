"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var strong_error_handler_1 = __importDefault(require("strong-error-handler"));
var routes_1 = require("./app/routes");
var App = /** @class */ (function () {
    function App() {
        this.routes = new routes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.errorHandler();
        this.routes.routes(this.app);
    }
    App.prototype.config = function () {
        this.app.use(body_parser_1.default.json({ limit: '5mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    };
    App.prototype.errorHandler = function () {
        this.app.use(strong_error_handler_1.default({
            debug: process.env.ENV !== 'prod',
            log: true,
        }));
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map