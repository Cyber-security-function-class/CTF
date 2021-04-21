
// init database 
import * as dotenv from 'dotenv';
import { Client } from 'pg'
import { expect } from 'chai';
import request from 'request'
import { userTest } from "./user.spec"
import app from "../app" 
import {server} from "../index"
dotenv.config();

const dbconfig = {
    host: process.env.dbHost || "localhost",
    user: process.env.dbUser || "skilluser",     
    password: process.env.dbPassword || "imskilluser",
    database: "SkillCTF",
    port: 5432
};
const PORT = 7000
const dbClient = new Client(dbconfig)
let service

dbClient.connect()
before(done => {
    dbClient.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;", 
        (err, res) => {
            dbClient.end()
            console.log("starting app")
            service = server(PORT,app)
            service.on("app_started",function() {
                done()
            })
        }
    )
})

after(done => {
    console.log("close app")
    service.close()
})
describe("-- test --", () => {
    describe("user test",()=>{
        it("starting user test",userTest)
    })
})