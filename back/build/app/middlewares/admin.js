"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../error/index");
exports.default = (req, res, next) => {
    var _a;
    let isAdmin = (_a = req['decoded']) === null || _a === void 0 ? void 0 : _a.isAdmin;
    if (!isAdmin) {
        return res.status(403).json({
            error: index_1.getErrorMessage(index_1.ErrorType.AccessDenied),
            detail: 'only admin'
        });
    }
    const p = new Promise((resolve, reject) => {
        if (isAdmin) {
            resolve(true);
        }
        else {
            reject();
        }
    });
    const onError = (error) => {
        res.status(400).json({
            error: index_1.getErrorMessage(index_1.ErrorType.AccessDenied),
            detail: "you are not a admin."
        });
    };
    p.then(() => {
        next();
    }).catch(onError);
};
//# sourceMappingURL=admin.js.map