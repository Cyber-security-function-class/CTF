"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userValidator_1 = require("../../middlewares/userValidator");
var authController_1 = __importDefault(require("./authController"));
var express_validator_1 = require("express-validator");
var routes = express_1.default.Router();
// routes.post("/signUp",)
routes.post("/signUp", userValidator_1.signUpValidator(), authController_1.default.signUp);
routes.post("/signUpTest", userValidator_1.signUpValidator(), function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else {
        console.log(req.body);
        return res.json({ result: true });
    }
});
exports.default = routes;
//# sourceMappingURL=index.js.map