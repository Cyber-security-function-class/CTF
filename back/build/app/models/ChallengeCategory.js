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
exports.ChallengeCategoryFactory = exports.ChallengeCategory = void 0;
var sequelize_1 = require("sequelize");
var ChallengeCategory = /** @class */ (function (_super) {
    __extends(ChallengeCategory, _super);
    function ChallengeCategory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChallengeCategory;
}(sequelize_1.Model));
exports.ChallengeCategory = ChallengeCategory;
function ChallengeCategoryFactory(sequelize) {
    return sequelize.define("ChallengeCategory", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        challengeId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        }
    });
}
exports.ChallengeCategoryFactory = ChallengeCategoryFactory;
//# sourceMappingURL=ChallengeCategory.js.map