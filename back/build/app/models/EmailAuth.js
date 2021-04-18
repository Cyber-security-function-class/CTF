'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAuthFactory = exports.EmailAuth = void 0;
var sequelize_1 = require("sequelize");
var EmailAuth = /** @class */ (function (_super) {
    __extends(EmailAuth, _super);
    function EmailAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmailAuth;
}(sequelize_1.Model));
exports.EmailAuth = EmailAuth;
function EmailAuthFactory(sequelize) {
    return sequelize.define("email_auth", {
        email: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        }
    });
}
exports.EmailAuthFactory = EmailAuthFactory;
//# sourceMappingURL=EmailAuth.js.map