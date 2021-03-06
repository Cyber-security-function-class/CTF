// test code modules
import request from 'request'
import { expect,assert } from 'chai';

import db from "../app/models/index"
import { Op } from 'sequelize';

import jwt_decode from "jwt-decode";

const ADDRESS = "http://localhost"
const PORT = process.env.PORT || 7000
const BASEURI = ADDRESS+":"+PORT
const emailVerifiedRepository = db.repositories.emailVerifiedRepository
const userRepository = db.repositories.userRepository

interface response {
    err: any,
    res?: request.Response,
    body?: any
}

export const getDecoded = (token: string): object => {
    return jwt_decode(token.split(' ')[1])
}

export const register = (userInfo): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        request.post(BASEURI+"/api/user/signUp",{
        body : userInfo,
        json: true
        },(err, res, body)=>{
            if (err) {
                console.log(err)
                reject(err)
            }
            if ( body?.result ){
                resolve(body?.result)
            } else {
                resolve(false)
            }
        })
    })
}

export const login = (userInfo):Promise<response> => {
    return new Promise((resolve, reject) => {
        request.post(BASEURI+"/api/user/signIn",{
            body : userInfo,
            json: true
        },(err, res, body)=>{
            if(err) {
                console.log(err)
                reject(err)
            }
            resolve({err,res,body})
        })
    })
}

export const verifyEmails = ():Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const result = await emailVerifiedRepository.findAll({raw: true,attributes:['id']})
        await emailVerifiedRepository.update({isVerified:true},{where:{[Op.or]: result}})
        resolve(true)
    })
}

export const makeAdmin = (userId:string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const result = await userRepository.update({isAdmin:true},{where:{id:userId}})
        if(result[0] == [ 1 ]) {
            resolve(true)
            return
        }
        reject(false)
    })
    
}

interface teamInfo {
    teamName: string
    teamPassword: string
}

export const createTeam = (token: string, teamInfo:teamInfo): Promise<boolean> => {
    return new Promise((resolve, reject)=>{
        request.post(BASEURI+"/api/user/createTeam",{
            headers : {
                Authorization: token
            },
            body : teamInfo,
            json : true
        },(err, res, body) => {
            if(body?.result){
                resolve(body?.result)
            } else {
                reject(false)
            }
        })
    })
    
}

export const joinTeam = (token: string, teamInfo:teamInfo):Promise<boolean> => {
    return new Promise((resolve, reject)=>{
        request.post(BASEURI+"/api/user/joinTeam",{
            headers : {
                Authorization: token
            },
            body : {
                teamName : teamInfo.teamName,
                teamPassword : teamInfo.teamPassword
            },
            json : true
        },(err, res, body) => {
            if(body?.result){
                resolve(body?.result)
            } else {
                reject(false)
            }
        })
    })
}