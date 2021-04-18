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
exports.EmailDetailFactory = exports.EmailDetail = void 0;
var sequelize_1 = require("sequelize");
var EmailDetail = /** @class */ (function (_super) {
    __extends(EmailDetail, _super);
    function EmailDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmailDetail;
}(sequelize_1.Model));
exports.EmailDetail = EmailDetail;
function EmailDetailFactory(sequelize) {
    return sequelize.define("email_detail", {
        email: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        isVerified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
}
exports.EmailDetailFactory = EmailDetailFactory;
//# sourceMappingURL=EmailDetail.js.map