'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const Category_1 = require("./Category");
const Challenge_1 = require("./Challenge");
const Solved_1 = require("./Solved");
const User_1 = require("./User");
const Team_1 = require("./Team");
const Notice_1 = require("./Notice");
const db = {
    sequelize: new sequelize_typescript_1.Sequelize(dbconfig_1.default.database, dbconfig_1.default.username, dbconfig_1.default.password, {
        host: dbconfig_1.default.host,
        dialect: 'postgres',
        logging: dbconfig_1.default.logging,
        models: [User_1.User, Category_1.Category, Challenge_1.Challenge, Solved_1.Solved, Team_1.Team, Notice_1.Notice],
        repositoryMode: true,
    })
};
exports.default = db;
//# sourceMappingURL=index.js.map