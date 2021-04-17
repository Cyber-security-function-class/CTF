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
exports.CategoryFactory = exports.Category = void 0;
var sequelize_1 = require("sequelize");
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Category;
}(sequelize_1.Model));
exports.Category = Category;
// Category.hasOne(Project, {     // model category 와 hasMany
//     sourceKey: "id",
//     foreignKey: "category",
//     as: "projects", // this determines the name in `associations`!
// });
function CategoryFactory(sequelize) {
    return sequelize.define("category", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        }
    });
}
exports.CategoryFactory = CategoryFactory;
//# sourceMappingURL=Category.js.map