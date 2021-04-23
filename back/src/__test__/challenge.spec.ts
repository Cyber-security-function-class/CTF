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


describe(addDescribeFormat("category_test"), function () {
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
    it("category - web",(done) => {
        try {
            request.post(BASEURI+"/api/category/addCategory",{
                body : { category : "web"},
                json : true,
                headers : { 
                    Authorization : token
                }
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("category - pwn",(done) => {
        try {
            request.post(BASEURI+"/api/category/addCategory",{
                body : { category : "pwn"},
                json : true,
                headers : { 
                    Authorization : token
                }
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("add web challenge1",(done) =>{
        try {
            request.post(BASEURI+"/api/challenge/addChallenge",{
                body : { 
                    categoryId : 1,
                    title :"first web chall",
                    content : "this is test challenge",
                    score : 300,
                    flag : "skillCTF{helloworld}"
                },
                json : true,
                headers : { 
                    Authorization : token
                }
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("add web challenge2",(done) =>{
        try {
            request.post(BASEURI+"/api/challenge/addChallenge",{
                body : { 
                    categoryId : 1,
                    title :"second web chall",
                    content : "this is test challenge",
                    score : 300,
                    flag : "skillCTF{helloworld111}"
                },
                json : true,
                headers : { 
                    Authorization : token
                }
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("add pwn challenge1",(done) =>{
        try {
            request.post(BASEURI+"/api/challenge/addChallenge",{
                body : {
                    id : 1,
                    categoryId : 2,
                    title :"second web chall",
                    content : "this is test challenge",
                    score : 300,
                    flag : "skillCTF{helloworld222}"
                },
                json : true,
                headers : { 
                    Authorization : token
                }
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("get challenges",(done) =>{
        try {
            request.get(BASEURI+"/api/challenge/getchallenges",{
                headers : {
                    Authorization : token
                },
                json : true
            },
            (err,res,body)=>{
                assert(body.length == 3)
                done()
            })
        } catch (err){
            done()
        }
    })
    it("get challenges category filter",(done) =>{
        try {
            request.get(BASEURI+"/api/challenge/getchallenges?category=1",{
                headers : {
                    Authorization : token
                },
                json :true
            },
            (err,res,body)=>{
                assert(body.length == 2)
                done()
            })
        } catch (err){
            done()
        }
    })
    it("update challenge",(done) => {
        try {
            request.post(BASEURI+"/api/challenge/updateChallenge",{
                body : { 
                    id : 1,
                    title : "updatedChallenge",
                    content : "update challenge content",
                    score : 1000,
                    categoryId : 2,
                    flag : "skillCtf{123}"
                },
                headers : {
                    Authorization : token
                },
                json : true
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch(err) {
            done()
        }
    })
    it("delete challenge",(done) =>{
        try {
            request.post(BASEURI+"/api/challenge/deleteChallenge",{
                headers : {
                    Authorization : token
                },body : {
                    id : 1
                },json : true
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("createTeam (leader : user1)",(done)=>{
        try {
            request.post(BASEURI+"/api/user/createTeam",{
              headers : {
                Authorization: token
              },
              body : {
                  teamName:"helloteam",
                  teamPassword : "hellopass"
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
    it("auth flag ( wrong flag ) ", (done)=> {
        try {
            request.post(BASEURI+"/api/challenge/authFlag",{
                headers : {
                    Authorization : token
                },body : {
                    flag : "skillCTF{asdad}"
                },json : true
            },(err, res, body) => {
                assert(!body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
    it("auth flag ", (done)=> {
        try {
            request.post(BASEURI+"/api/challenge/authFlag",{
                headers : {
                    Authorization : token
                },body : {
                    flag : "skillCTF{helloworld111}"
                },json : true
            },(err, res, body) => {
                assert(body.result)
                done()
            })
        } catch (err) {
            console.log(err)
            done()
        }
    })
})