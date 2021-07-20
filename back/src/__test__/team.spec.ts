import { expect,assert } from 'chai';
import request from 'request'
import { preStart, dbclient } from "./index.spec"
import jwt_decode from "jwt-decode";
import db from "../app/models/index"
import {User} from "../app/models/User"
import { Op} from 'sequelize'
import * as dotenv from 'dotenv';
import { getDecoded, login, makeAdmin,
   register , createTeam,
   joinTeam 
} from './utils';

dotenv.config();

const ADDRESS = "http://localhost"
const PORT = process.env.PORT || 7000
const BASEURI = ADDRESS+":"+PORT

const userInfo = {
  nickname : "testuser1",
  password : "testpass",
  email : "testuser1@example.com",
}

const userInfo2 = {
  nickname : "testuser2",
  password : "testpass",
  email : "testuser2@example.com",
}
const userInfo3 = {
  nickname : "testuser3",
  password : "testpass",
  email : "testuser3@example.com",
}
const userInfo4 = {
  nickname : "testuser4",
  password : "testpass",
  email : "testuser4@example.com",
}

const teamInfo = {
    teamName : "testteam",
    teamPassword : "testpass",
}
const addDescribeFormat = (descripbe:string) => {
  return `====== ${descripbe} ======`
}


describe(addDescribeFormat("team_test"), function () {
  let service
  let users = {
    user1:{
      token : "",
      decoded : {}
    },
    user2:{
      token : "",
      decoded :{}
    },
    user3:{
      token : "",
      decoded :{}
    },
    user4:{
      token : "",
      decoded : {}
    }
  }
  let teamId
  before(done => {
    service = preStart(done)
  })
  it("register user1",(done)=>{
    register(userInfo)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("login user1",(done)=>{
    login(userInfo)
    .then(result => {
      if (result?.err) {
        console.log(result?.err)
        done()
      }
      users.user1.token = result?.body.token
      users.user1.decoded = getDecoded(users.user1.token)
      assert(users.user1.token !== null || users.user1.token !== undefined)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })

  it("Make user1 to Admin", (done)=>{
    makeAdmin(users.user1.decoded['id'])
    .then(result => {
      assert(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("register user2",(done)=>{
    register(userInfo2)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("register user3",(done)=>{
    register(userInfo3)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("register user4",(done)=>{
    register(userInfo4)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })
  it("login user1",(done)=>{
    login(userInfo)
    .then(result => {
      if (result?.err) {
        console.log(result?.err)
        done()
      }
      users.user1.token = result?.body.token
      users.user1.decoded = getDecoded(users.user1.token)
      assert(users.user1.token !== null || users.user1.token !== undefined)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })

  it("createTeam (leader : user1)",(done)=>{
    createTeam(users.user1.token,teamInfo)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })
  
  it("login user2",(done) => {
    login(userInfo2)
    .then(result => {
      if (result?.err) {
        console.log(result?.err)
        done()
      }
      users.user2.token = result?.body.token
      users.user2.decoded = getDecoded(users.user2.token)
      assert(users.user1.token !== null || users.user1.token !== undefined)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })
  it("create duplicate team (leader : user2)",(done) => {
    createTeam(users.user2.token,teamInfo)
    .then(result => {
      assert(!result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("login user3",(done) => {
    login(userInfo2)
    .then(result => {
      if (result?.err) {
        console.log(result?.err)
        done()
      }
      users.user3.token = result?.body.token
      users.user3.decoded = getDecoded(users.user3.token)
      assert(users.user1.token !== null || users.user1.token !== undefined)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })

  it("login user4",(done) => {
    login(userInfo2)
    .then(result => {
      if (result?.err) {
        console.log(result?.err)
        done()
      }
      users.user4.token = result?.body.token
      users.user4.decoded = getDecoded(users.user4.token)
      assert(users.user1.token !== null || users.user1.token !== undefined)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })

  it("join team (user2) - wrong teamPassword",(done) => {
    let tmpTeamInfo = teamInfo
    tmpTeamInfo.teamPassword += "wrongpass"
    joinTeam(users.user2.token,tmpTeamInfo)
    .then(result => {
      assert(!result)
      done()
    })
    .catch(err=> {
      console.log(err)
      done()
    })
  })
  it("join team (user2)",(done) => {
    joinTeam(users.user2.token,teamInfo)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err=> {
      console.log(err)
      done()
    })
  })

  it("join team (user3) - wrong teamName",(done) => {
    let tmpTeamInfo = teamInfo
    tmpTeamInfo.teamName += "wrongName"
    joinTeam(users.user3.token,tmpTeamInfo)
    .then(result => {
      assert(!result)
      done()
    })
    .catch(err=> {
      console.log(err)
      done()
    })
  })
  it("join team (user3)",(done) => {
    joinTeam(users.user3.token,teamInfo)
    .then(result => {
      assert(result)
      done()
    })
    .catch(err=> {
      console.log(err)
      done()
    })
  })
  it("get teams",(done) => {
    request.get(BASEURI + "/api/user/getTeams",
      (err, res, body) => {
        body = JSON.parse(body)
        console.log("get teams(sort)")
        console.log(body)
      teamId = body[0].id
      assert(body.length == 1)
      done()
    })
  })
  it("get team",(done) => {
    request.get(BASEURI + "/api/user/getTeam?id=" + teamId,
      (err, res, body) => {
        body = JSON.parse(body)
      assert(body.id === teamId)
      done()
    })
  })
  it("join team (user4)",(done) => {
    joinTeam(users.user4.token,teamInfo)
    .then(result => {
      assert(!result)
      done()
    })
    .catch(err=> {
      console.log(err)
      done()
    })
  })
  it("get teams",(done) => {
    request.get(BASEURI+"/api/user/getTeams",{
      headers : {
        Authorization : users.user1.token
      }, json : true
    },(err,res,body)=>{
      console.log(body)
      teamId = body[0].id
      assert(body.length == 1)
      done()
    })
  })
  it("get team",(done) => {
    request.get(BASEURI+"/api/user/getTeam?id="+teamId,{
      headers : {
        Authorization : users.user1.token
      }, json : true
    },(err,res,body)=>{
      assert(body.error == undefined)
      done()
    })
  })
})