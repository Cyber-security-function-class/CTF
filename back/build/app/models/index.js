'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var sequelize_1 = require("sequelize");
var dbconfig_1 = __importDefault(require("../config/dbconfig"));
// import models
var User_1 = __importDefault(require("./User"));
var sequelize = new sequelize_typescript_1.Sequelize(dbconfig_1.default.database, dbconfig_1.default.username, dbconfig_1.default.password, {
    host: dbconfig_1.default.host,
    dialect: 'postgres'
});
var db = {
    sequelize: sequelize,
    User: User_1.default(sequelize, sequelize_1.DataTypes)
};
exports.default = db;
//# sourceMappingURL=index.js.map