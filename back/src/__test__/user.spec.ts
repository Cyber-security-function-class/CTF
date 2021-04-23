import { expect,assert } from 'chai';
import request from 'request'
import { preStart, dbclient } from "./index.spec"
import jwt_decode from "jwt-decode";
import db from "../app/models/index"
import {User} from "../app/models/User"
import { EmailVerified } from '../app/models/EmailVerified';
import { Op } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const userRepository = db.sequelize.getRepository(User)
const emailVerifiedRepository = db.sequelize.getRepository(EmailVerified)
const ADDRESS = "http://localhost"
const PORT = process.env.PORT || 7000
const BASEURI = ADDRESS+":"+PORT

const userInfo = {
  nickname : "testuser",
  password : "testpass",
  email : "testuser@example.com",
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
  it("register duplicate user",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signUp",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        expect(body.error.errorType).to.equal('alreadyExist')
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("verify emails", (done)=>{
    emailVerifiedRepository.findAll({raw: true,attributes:['id']})
    .then(e=>{
      emailVerifiedRepository.update({isVerified:true},{where:{[Op.or]: e}})
      done()
    }).catch(err=>{
      done()
    })
  })
  it("login",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        token = body.token
        decoded = jwt_decode(token.split(' ')[1])
        assert(token)
        done()
      })
    } catch (err) {
      done()
    }
  })
  it("getUsers(no login)",(done)=>{
    request.get(BASEURI+"/api/user/getUsers",(err,res,body)=>{
      body = JSON.parse(body)
      assert(body.error.errorType == "accessDenied")
      done()
    })
  })
  it("getUsers",(done)=>{
    request.get(BASEURI+"/api/user/getUsers",{
      headers :{
        Authorization : token
      },
      json : true
    },(err,res,body)=>{
      assert(!body.error)
      done()
    })
  })

  it("getUser",(done)=>{
    request.get(BASEURI+"/api/user/getUser?id="+decoded['id'],{
      headers :{
        Authorization : token
      },
      json : true
    },(err,res,body)=>{
      assert(!body.error)
      done()
    })
  })
  it("getUser bad_valid",(done)=>{
    request.get(BASEURI+"/api/user/getUser?id[]=1sdqwd",{
      headers :{
        Authorization : token
      },
      json : true
    },(err,res,body)=>{
      assert(body.error.errorType == "validationError")
      done()
    })
  })

  it("Make user to Admin", (done)=>{
    userRepository.update({isAdmin:true},{where:{id:decoded['id']}})
    .then(e=>{
      assert(e[0] == [ 1 ])
      done()
    }).catch(err=>{
      done()
    })
  })

  it("get token to get isAdmin",(done)=>{
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
  
  it("Update user (need isAdmin)",(done) => {
    try {
      request.post(BASEURI+"/api/user/updateUser",{
        headers:{
          Authorization : token
        },
        body : {
          id : decoded['id'],
          nickname : "testuser",
          email : "testuser@mail.com",
          isAdmin : true
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
  it("Delete user (need isAdmin)",(done) => {
    try {
      request.post(BASEURI+"/api/user/deleteUser",{
        headers:{
          Authorization : token
        },
        body : {
          id : decoded['id']
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

  it("register again",(done)=>{
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
  it("login again",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        token = body.token
        decoded = jwt_decode(token.split(' ')[1]);
        assert(token)
        done()
      })
    } catch (err) {
      done()
    }
  })

})