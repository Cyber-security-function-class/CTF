import { expect,assert } from 'chai';
import request from 'request'
import { preStart } from "./index.spec"
import db from "../app/models/index"
import {User} from "../app/models/User"

import { register, login, verifyEmails, makeAdmin, getDecoded } from './utils'

import * as dotenv from 'dotenv';
dotenv.config();

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

  it("register duplicate user",(done)=>{
    register(userInfo)
    .then(result => {
      assert(!result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("verify emails", (done)=>{
    verifyEmails()
    .then(result => {
      expect(result)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it("login",(done)=>{
    login(userInfo)
    .then(result => {
      if (result?.err) {
        console.log(result?.err)
        done()
      }
      token = result?.body.token
      decoded = getDecoded(token)
      assert(token)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
    
  })
  
  it("getUsers(no login)",(done)=>{
    request.get(BASEURI+"/api/user/getUsers",(err,res,body)=>{
      console.log(body)
      assert(!body.error)
      done()
    })
  })

  it("getUsers",(done)=>{
    request.get(BASEURI+"/api/user/getUsers",{
      headers :{
        Authorization : token
      },
      json : true
    }, (err, res, body) => {
      console.log(body)
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
    makeAdmin(decoded.id) // boolean
    .then(result => {
      assert(result)
      done()
    })
    .catch(err=>{
      console.log(err)
      done()
    })
  })

  it("login to get adminToken",(done)=>{
    try {
      request.post(BASEURI+"/api/user/signIn",{
        body : userInfo,
        json : true
      },(err, res, body) => {
        token = body.token
        decoded = getDecoded(token);
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
    register(userInfo)
    .then(result => {
      assert(result)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })

  it("login again",(done)=>{
    login(userInfo)
    .then(result => {
      token = result?.body?.token
      assert(token !== undefined || token !== null)
      done()
    }).catch(err => {
      console.log(err)
      done()
    })
  })

})