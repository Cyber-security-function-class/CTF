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
var jwt = __importStar(require("jsonwebtoken"));
exports.default = (function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        });
    }
    var p = new Promise(function (resolve, reject) {
        jwt.verify(token, req.app.get('jwt-secret'), function (err, decoded) {
            if (err)
                reject(err);
            resolve(decoded);
        });
    });
    var onError = function (error) {
        res.status(403).json({
            success: false,
            message: error.message
        });
    };
    p.then(function (decoded) {
        req.decoded = decoded;
        next();
    }).catch(onError);
});
//# sourceMappingURL=auth.js.map