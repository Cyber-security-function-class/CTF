'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

const dbconfig = {
    "username" : process.env.dbUser || "skilluser",
    "password" : process.env.dbPassword || "imskilluser",
    "host" : process.env.dbHost || "localhost",
    "database" : "SkillCTF",
    "dialect" : "postgres"
}


export default dbconfig