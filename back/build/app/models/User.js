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
exports.UserFactory = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
function UserFactory(sequelize) {
    return sequelize.define("user", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        score: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=User.js.map