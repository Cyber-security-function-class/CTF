import request from "supertest"

import app from "../src/app"
import { server } from "../src/index"

server(3000,app) 


request(app) // 2번
    .post("/signUp")
    .set('Accept', 'application/json')
    .type('application/json')
    .send({nickname : "testuser"})
    .expect('Content-Type', /json/)
