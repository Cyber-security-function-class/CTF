import { expect } from 'chai';
import request from 'request'

const ADDRESS = "http://localhost"
const PORT = 7000
const BASEURI = ADDRESS+":"+PORT+"/"


describe('register test', function () {
    it('return { result : true }', function (done) {
        request.post(BASEURI+"api/user/signUp",{
          body : {
            nickname : "testuser",
            password : "testpass",
            email : "testuser@example.com",
          },
          json: true
        },(err, res, body)=>{
          console.log("body",body)
          expect(res.statusCode).to.equal(200)
            done()
        })
    })
})