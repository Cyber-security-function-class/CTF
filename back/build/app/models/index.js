'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var dbconfig_1 = __importDefault(require("../config/dbconfig"));
var Challenge_1 = require("./Challenge");
var Category_1 = require("./Category");
var Solved_1 = require("./Solved");
var User_1 = require("./User");
var EmailVerified_1 = require("./EmailVerified");
// import models
var sequelize = new sequelize_typescript_1.Sequelize(dbconfig_1.default.database, dbconfig_1.default.username, dbconfig_1.default.password, {
    host: dbconfig_1.default.host,
    dialect: 'postgres',
    logging: dbconfig_1.default.logging
});
var db = {
    sequelize: sequelize,
    User: User_1.UserFactory(sequelize),
    Challenge: Challenge_1.ChallengeFactory(sequelize),
    Category: Category_1.CategoryFactory(sequelize),
    EmailVerified: EmailVerified_1.EmailVerifiedFactory(sequelize),
};
db['Solved'] = Solved_1.SolvedFactory(sequelize, User_1.User, Challenge_1.Challenge);
// User <--> solved <--> challenge
db.User.belongsToMany(db.Challenge, {
    through: Solved_1.Solved,
});
db.Challenge.belongsToMany(db.User, {
    through: Solved_1.Solved,
});
exports.default = db;
//# sourceMappingURL=index.js.map