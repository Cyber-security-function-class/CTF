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
                    categoryId : 0,
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
})