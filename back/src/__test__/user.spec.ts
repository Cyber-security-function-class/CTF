import { expect } from 'chai';
import request from 'request'

const ADDRESS = "http://localhost"
const PORT = 7000
const BASEURI = ADDRESS+":"+PORT

const userInfo = {
  nickname : "testuser",
  password : "testpass",
  email : "testuser@example.com",
}


const addDescribeFormat = (descripbe:string) => {
  return `====== ${descripbe} ======`
}

export const userTest = async () => {
  return true
}

describe(addDescribeFormat("register test"), function () {
  it('return { result : true }', function (done) {
    request.post(BASEURI+"/api/user/signUp",{
      body : userInfo,
      json: true
    },(err, res, body)=>{
      console.log("body",body)
      expect(res.statusCode).to.equal(200)
    })
  })
  it("return { alreadyExist }",(done) => {
    request.post(BASEURI+"/api/user/signUp",{
      body : userInfo,
      json: true
    },(err, res, body)=>{
      console.log("body",body)
      expect(res.statusCode).to.equal(400)
    })
  })
})