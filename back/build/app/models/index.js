'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var dbconfig_1 = __importDefault(require("../config/dbconfig"));
// import models
var User_1 = require("./User");
var sequelize = new sequelize_typescript_1.Sequelize(dbconfig_1.default.database, dbconfig_1.default.username, dbconfig_1.default.password, {
    host: dbconfig_1.default.host,
    dialect: 'postgres',
    logging: dbconfig_1.default.logging
});
var db = {
    sequelize: sequelize,
    User: User_1.UserFactory(sequelize)
};
exports.default = db;
//# sourceMappingURL=index.js.map