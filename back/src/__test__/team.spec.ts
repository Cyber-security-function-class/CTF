import { expect,assert } from 'chai';
import request from 'request'
import { preStart, dbclient } from "./index.spec"
import jwt_decode from "jwt-decode";
import db from "../app/models/index"
import {User} from "../app/models/User"
import { EmailVerified } from '../app/models/EmailVerified';
import { Op} from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();

const userRepository = db.sequelize.getRepository(User)
const emailVerifiedRepository = db.sequelize.getRepository(EmailVerified)


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
      decoded :""
    },
    user2:{
      token : "",
      decoded :""
    },
    user3:{
      token : "",
      decoded :""
    },
    user4:{
      token : "",
      decoded :""
    }
  }
  let teamId
  before(done => {
    service = preStart(done)
  })
  it("register user1",(done)=>{
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
  it("login user1",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        users.user1.token = body.token
        users.user1.decoded = jwt_decode(users.user1.token);
        assert(users.user1.token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("Make user1 to Admin", (done)=>{
    userRepository.update({isAdmin:true},{where:{id:users.user1.decoded['id']}})
    .then(e=>{
      assert(e[0] == [ 1 ])
      done()
    }).catch(err=>{
      done()
    })
  })
  it("register user2",(done)=>{
    try{
      request.post(BASEURI+"/api/user/signUp",{
        body : userInfo2,
        json: true
      },(err, res, body)=>{
        expect(body.result).to.equal(true)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("register user3",(done)=>{
    try{
      request.post(BASEURI+"/api/user/signUp",{
        body : userInfo3,
        json: true
      },(err, res, body)=>{
        expect(body.result).to.equal(true)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("register user4",(done)=>{
    try{
      request.post(BASEURI+"/api/user/signUp",{
        body : userInfo4,
        json: true
      },(err, res, body)=>{
        expect(body.result).to.equal(true)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("verify emails", (done)=>{
    setTimeout(()=>{
      emailVerifiedRepository.findAll({raw: true,attributes:['id']})
      .then(e=>{
        console.log(e)
        emailVerifiedRepository.update({isVerified:true},{where:{[Op.or]: e}})
        done()
      }).catch(err=>{
        done()
      })
    },1000)
  })
  it("login user1",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        users.user1.token = body.token
        users.user1.decoded = jwt_decode(users.user1.token);
        assert(users.user1.token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("createTeam (leader : user1)",(done)=>{
    try {
        request.post(BASEURI+"/api/user/createTeam",{
          headers : {
            Authorization: users.user1.token
          },
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
  it("login user2",(done) => {
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo2,
        json : true
      },(err, res, body) => {
        users.user2.token = body.token
        users.user2.decoded = jwt_decode(users.user2.token);
        assert(users.user2.token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("create duplicate team (leader : user2)",(done) => {
    try {
      request.post(BASEURI+"/api/user/createTeam",{
        headers : {
          Authorization: users.user2.token
        },
        body : teamInfo,
        json : true
      },(err, res, body) => {
        assert(body?.error.errorType == "alreadyExist")
        done()
      })
  } catch (err) {
      done()
  }
  })
  it("login user3",(done) => {
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo3,
        json : true
      },(err, res, body) => {
        users.user3.token = body.token
        users.user3.decoded = jwt_decode(users.user3.token);
        assert(users.user3.token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("login user3",(done) => {
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo4,
        json : true
      },(err, res, body) => {
        users.user4.token = body.token
        users.user4.decoded = jwt_decode(users.user4.token);
        assert(users.user3.token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("join team (user2) - wrong teamPassword",(done) => {
    try {
      request.post(BASEURI+"/api/user/joinTeam",{
        headers : {
          Authorization: users.user2.token
        },
        body : {
          teamName : teamInfo.teamName,
          teamPassword : teamInfo.teamPassword+"as"
        },
        json : true
      },(err, res, body) => {
        
        assert(body.error.errorType == "accessDenied")
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("join team (user2)",(done) => {
    try {
      request.post(BASEURI+"/api/user/joinTeam",{
        headers : {
          Authorization: users.user2.token
        },
        body : {
          teamName : teamInfo.teamName,
          teamPassword : teamInfo.teamPassword
        },
        json : true
      },(err, res, body) => {
        assert(body.result)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("join team (user3) - wrong teamName",(done) => {
    try {
      request.post(BASEURI+"/api/user/joinTeam",{
        headers : {
          Authorization: users.user3.token
        },
        body : {
          teamName : teamInfo.teamName+"a",
          teamPassword : teamInfo.teamPassword
        },
        json : true
      },(err, res, body) => {
        assert(body.error.errorType == "notExist")
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("join team (user3)",(done) => {
    try {
      request.post(BASEURI+"/api/user/joinTeam",{
        headers : {
          Authorization: users.user3.token
        },
        body : {
          teamName : teamInfo.teamName,
          teamPassword : teamInfo.teamPassword
        },
        json : true
      },(err, res, body) => {
        assert(body.result)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("join team (user4)",(done) => {
    try {
      request.post(BASEURI+"/api/user/joinTeam",{
        headers : {
          Authorization: users.user4.token
        },
        body : {
          teamName : teamInfo.teamName,
          teamPassword : teamInfo.teamPassword
        },
        json : true
      },(err, res, body) => {
        console.log(body)
        assert(body.error.errorType == "accessDenied")
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("get teams",(done) => {
    request.get(BASEURI+"/api/user/getTeams",{
      headers : {
        Authorization : users.user1.token
      }, json : true
    },(err,res,body)=>{
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
      console.log(body)
      assert(body.error == undefined)
      done()
    })
  })
})