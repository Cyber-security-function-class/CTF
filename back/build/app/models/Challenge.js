"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Category_1 = require("./Category");
const Solved_1 = require("./Solved");
let Challenge = class Challenge extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Challenge.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Challenge.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Challenge.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Challenge.prototype, "score", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Category_1.Category),
    __metadata("design:type", Array)
], Challenge.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Category_1.Category),
    __metadata("design:type", Number)
], Challenge.prototype, "categoryId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Challenge.prototype, "flag", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Challenge.prototype, "solved_count", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Solved_1.Solved),
    __metadata("design:type", Array)
], Challenge.prototype, "solveds", void 0);
Challenge = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'challenge'
    })
], Challenge);
exports.Challenge = Challenge;
//# sourceMappingURL=Challenge.js.map