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
exports.Team = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
let Team = class Team extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "teamName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "leader", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => User_1.User),
    __metadata("design:type", Array)
], Team.prototype, "users", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Team.prototype, "score", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "teamPassword", void 0);
Team = __decorate([
    sequelize_typescript_1.Table
], Team);
exports.Team = Team;
//# sourceMappingURL=Team.js.map