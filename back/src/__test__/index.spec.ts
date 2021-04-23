
// init database 
import * as dotenv from 'dotenv';
import { Client } from 'pg'
import { init } from "../index"


dotenv.config();

const dbconfig = {
    host: process.env.dbHost || "localhost",
    user: process.env.dbUser || "skilluser",     
    password: process.env.dbPassword || "imskilluser",
    database: "SkillCTF",
    port: 5432
};

const dbClient = new Client(dbconfig)

export const preStart = async(done) => {
    let service
    dbClient.connect()
    console.log(" -- db init -- ")
    dbClient.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;", 
        async (err, res) => {
            dbClient.end()
            console.log("starting app")
            service = init(done)
        }
    )
    return service
}
export const dbclient = dbClient


// 테스트 코드가 급하게 짜느라 더러움 ㅜ