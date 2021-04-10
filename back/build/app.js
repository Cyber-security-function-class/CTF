"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var App = /** @class */ (function () {
    function App() {
        this.application = express();
    }
    return App;
}());
var app = new App().application;
app.get("/", function (req, res) {
    res.send("helloworld");
});
app.listen(3000, function () {
    console.log("start");
});
//# sourceMappingURL=app.js.map