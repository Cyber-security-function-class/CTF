"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import { Routes } from "./routes/routes"; TODO router
var bodyParser = require("body-parser");
var errorhandler = require("strong-error-handler");
var App = /** @class */ (function () {
    // public routes: Routes = new Routes();
    function App() {
        this.app = express();
        this.config();
        // this.routes.routes(this.app);
        this.errorHandler();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    App.prototype.errorHandler = function () {
        this.app.use(errorhandler({
            debug: process.env.ENV !== 'prod',
            log: true,
        }));
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map