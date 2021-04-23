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
exports.Solved = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Challenge_1 = require("./Challenge");
let Solved = class Solved extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Solved.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Solved.prototype, "score", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Challenge_1.Challenge),
    __metadata("design:type", Challenge_1.Challenge)
], Solved.prototype, "challenge", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Challenge_1.Challenge),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Solved.prototype, "challengeId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User),
    __metadata("design:type", User_1.User)
], Solved.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Solved.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Solved.prototype, "teamId", void 0);
Solved = __decorate([
    sequelize_typescript_1.Table
], Solved);
exports.Solved = Solved;
//# sourceMappingURL=Solved.js.map