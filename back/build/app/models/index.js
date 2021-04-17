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
    Solved: Solved_1.SolvedFactory(sequelize),
};
// Category <--> Challenge
db.Category.hasMany(db.Challenge, {
    sourceKey: "id",
    foreignKey: "category_id",
    onUpdate: 'cascade',
    onDelete: 'cascade',
});
db.Challenge.belongsTo(db.Category, {
    foreignKey: "category_id",
    targetKey: "id"
});
// Challenge <--> Solved <--> User
db.Challenge.hasMany(db.Solved, {
    sourceKey: "id",
    foreignKey: "challenge_id",
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
db.User.hasMany(db.Solved, {
    sourceKey: "id",
    foreignKey: "challenge_id",
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
db.Solved.belongsTo(db.Challenge, {
    foreignKey: "challenge_id",
    targetKey: "id"
});
db.Solved.belongsTo(db.User, {
    foreignKey: "user_id",
    targetKey: "id"
});
exports.default = db;
//# sourceMappingURL=index.js.map