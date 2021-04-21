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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Solved_1 = require("./Solved");
const Team_1 = require("./Team");
const EmailVerified_1 = require("./EmailVerified");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => EmailVerified_1.EmailVerified),
    __metadata("design:type", EmailVerified_1.EmailVerified)
], User.prototype, "emailVerified", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Team_1.Team),
    __metadata("design:type", Team_1.Team)
], User.prototype, "team", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Team_1.Team),
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "teamId", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Solved_1.Solved),
    __metadata("design:type", Array)
], User.prototype, "solveds", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
//# sourceMappingURL=User.js.map