"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../error/index");
exports.default = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            error: index_1.getErrorMessage(index_1.ErrorType.AccessDenied),
            detail: 'not logged in'
        });
    }
    const p = new Promise((resolve, reject) => {
        token = token.split(' ')[1];
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err)
                reject(err);
            resolve(decoded);
        });
    });
    const onError = (error) => {
        res.status(403).json({
            error: index_1.getErrorMessage(index_1.ErrorType.UnexpectedError),
            detail: error.message
        });
    };
    p.then((decoded) => {
        req.decoded = decoded;
        next();
    }).catch(onError);
};
//# sourceMappingURL=auth.js.map