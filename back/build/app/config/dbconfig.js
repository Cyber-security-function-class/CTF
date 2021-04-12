"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbconfig = {
    "username": process.env.dbUser || "skilluser",
    "password": process.env.dbPassword || "imskilluser",
    "host": process.env.dbHost || "localhost",
    "database": "skillctf",
    "dialect": "postgres",
    "operatorsAliases": false
};
exports.default = dbconfig;
//# sourceMappingURL=dbconfig.js.map