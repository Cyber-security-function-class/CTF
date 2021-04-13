import {Request, Response} from 'express'
import db from '../../models/index'
import * as jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import { check } from 'express-validator'
const User = db.User

const createHashedPassword = async (password: string) => {
    const saltRounds = 10
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}

const checkPassword = async (password: string, hashedPassword: string) => {
    const isPasswordCorrect = await compare(password, hashedPassword) // hash.toString for type checking hack
    return isPasswordCorrect
}

export default {
    signUp : async (req:Request, res:Response) => {
        // id,nickname,password,email,score,isAdmin,isVerified
        const nickname :string = req.body.nickname
        const password :string = req.body.password
        const email :string = req.body.email
        const hashedPassword = await createHashedPassword( password )

        // await check('nickname')

        User.create({
            nickname : nickname,
            password : hashedPassword,
            email : email
        }).then ( result => {
            res.json({result:result})
        }).catch( err => {
            res.json({result:false})
            console.log(err)
        })
        
    },

}