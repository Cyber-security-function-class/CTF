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
exports.SolvedFactory = exports.Solved = void 0;
var sequelize_1 = require("sequelize");
var Solved = /** @class */ (function (_super) {
    __extends(Solved, _super);
    function Solved() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Solved;
}(sequelize_1.Model));
exports.Solved = Solved;
function SolvedFactory(sequelize, User, Challenge) {
    return sequelize.define("solved", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        score: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        challenge_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Challenge,
                key: 'id'
            }
        }
    });
}
exports.SolvedFactory = SolvedFactory;
//# sourceMappingURL=Solved.js.map