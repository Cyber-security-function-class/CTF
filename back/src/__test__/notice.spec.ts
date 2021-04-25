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
  let notices
  before(done => {
    service = preStart(done)
  })
  it("register",(done)=>{
    try{
        request.post(BASEURI+"/api/user/signUp",{
        body : userInfo,
        json: true
    },(err, res, body)=>{
        console.log(body)
        expect(body.result).to.equal(true)
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
  it("Make user to Admin", (done)=>{
    userRepository.update({isAdmin:true},{where:{id:decoded['id']}})
    .then(e=>{
      assert(e[0] == [ 1 ])
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
  it("create notice (need isAdmin)",(done) => {
    try {
      request.post(BASEURI+"/api/notice/createNotice",{
        headers:{
          Authorization : token
        },
        body : {
            content : {
                title : "hello",
                content : "hihihi"
            }
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
    it("get notices", (done) => {
        try {
            request.get(BASEURI+"/api/notice/getNotices",{
            headers:{
                Authorization : token
            },
            json : true
        },(err, res, body) => {
            notices = body
            assert(body.length === 1)
            done()
        })
        } catch (err) {
            done()
        }
    })
    it("get notice", (done) => {
        try {
            request.get(BASEURI+"/api/notice/getNotice?id="+notices[0].id,{
                headers:{
                    Authorization : token
                },
                json : true
            },(err, res, body) => {
                assert(body.id === notices[0].id)
                done()
            })
        } catch (err) {
            done()
        }
    })
  
    it("update notice",(done) => {
        try {
            request.post(BASEURI+"/api/notice/updateNotice",{
                body : { 
                    id : notices[0].id,
                    content : {
                        title : "updated title",
                        content : "udpated content",
                        isUpdated : true
                    },
                },
                headers : {
                    Authorization : token
                },
                json : true
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })

    it("checking the notice update was succeed",(done) => {
        try {
            request.get(BASEURI+"/api/notice/getNotice?id="+notices[0].id,{
                headers:{
                    Authorization : token
                },
                json : true
            },(err, res, body) => {
                assert(body?.content?.isUpdated)
                done()
            })
        } catch (err) {
          done()
        }
    })

    it("delete notice",(done)=> {
        try {
            request.post(BASEURI+"/api/notice/deleteNotice",{
                body : { 
                    id : notices[0].id
                },
                headers : {
                    Authorization : token
                },
                json : true
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("check the notice delete was succeed", (done) => {
        try {
            request.get(BASEURI+"/api/notice/getNotices",{
            headers:{
                Authorization : token
            },
            json : true
        },(err, res, body) => {
            notices = body
            assert(body.length === 0)
            done()
        })
        } catch (err) {
            done()
        }
    })
})