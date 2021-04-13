import {Request, Response} from 'express'
import db from '../../models/index'
import * as jwt from 'jsonwebtoken'
const User = db.User

export default {
    signUp : async (req:Request, res:Response) => {
        // id,nickname,password,email,score,isAdmin,isVerified
        const nickname :string = req.body.nickname
        const password :string = req.body.password
        const email :string = req.body.email
        console.log(req.body.password)
        

        User.create({
            id : 1,
            nickname : nickname,
            password : password,
            email : email,
            score : 0,
            isAdmin : false
        }).then ( result => {
            console.log(result)
            res.json({result: "success"})
        }).catch( err => {
            console.log(err)
        })


        
    },

}