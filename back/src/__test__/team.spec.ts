import { expect,assert } from 'chai';
import request from 'request'
import { preStart, dbclient } from "./index.spec"
import jwt_decode from "jwt-decode";
import db from "../app/models/index"
import {User} from "../app/models/User"

const ADDRESS = "http://localhost"
const PORT = 7000
const BASEURI = ADDRESS+":"+PORT

const userInfo = {
  nickname : "testuser",
  password : "testpass",
  email : "testuser@example.com",
}

const teamInfo = {
    teamName : "testteam",
    teamPassword : "testpass",
}

const addDescribeFormat = (descripbe:string) => {
  return `====== ${descripbe} ======`
}


describe(addDescribeFormat("user_test"), function () {
  let service
  let token:string
  let decoded
  before(done => {
    service = preStart(done)
  })
  it("register",(done)=>{
    try{
      request.post(BASEURI+"/api/user/signUp",{
        body : userInfo,
        json: true
      },(err, res, body)=>{
        expect(body.result).to.equal(true)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("login",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        token = body.token
        decoded = jwt_decode(token);
        assert(token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("createTeam",(done)=>{
    try {
        request.post(BASEURI+"/api/team/createTeam",{
        body : teamInfo,
        json : true
        },(err, res, body) => {
            assert(body.result)
            done()
        })
    } catch (err) {
        done()
    }
  })
})