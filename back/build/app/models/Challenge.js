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
exports.ChallengeFactory = exports.Challenge = void 0;
var sequelize_1 = require("sequelize");
var Challenge = /** @class */ (function (_super) {
    __extends(Challenge, _super);
    function Challenge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Challenge;
}(sequelize_1.Model));
exports.Challenge = Challenge;
function ChallengeFactory(sequelize) {
    return sequelize.define("challenge", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        flag: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
}
exports.ChallengeFactory = ChallengeFactory;
//# sourceMappingURL=Challenge.js.map