import {Request, Response} from 'express'
import db from '../../models/index'
import * as jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import { validationResult } from "express-validator"
import environment from '../../config/config'
import { Op } from 'sequelize'
import { ErrorType, getErrorMessage } from '../../error/index'


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

export const signUp = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }

    // id,nickname,password,email,score,isAdmin,isVerified
    const nickname : string = req.body.nickname
    const password : string = req.body.password
    const email : string = req.body.email
    const hashedPassword = await createHashedPassword( password )

    // await check('nickname')
    const isExistingUser = await User.findOne({
        where : {
            [Op.or]: [{ nickname: nickname}, { email : email}]
        },
        raw : true
    }) 

    if ( isExistingUser !== null ) {
        if ( nickname === isExistingUser.nickname ) {
            return res.status(409).json(getErrorMessage(ErrorType.NicknameExists)).send()
        } else {
            return res.status(409).json(getErrorMessage(ErrorType.EmailExist)).send()
        }
    }

    try {
        const user = await User.create({
            nickname : nickname,
            password : hashedPassword,
            email : email
        })
        
        if(user) {
            res.json({ result: true })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const signIn = async (req,res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }

    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({where : {email:email},raw : true})

    if ( user === null ) { // user not exist
        return res.status(400).json(getErrorMessage(ErrorType.LoginFailed)).send()
    } else { // user exist
        const result = await checkPassword (password,user.password) // sign in result
        if ( result ) { // password correct
            // make token
            const token = jwt.sign({    // payload
                id: user.id, 
                email : user.email, 
                name : user.nickname,
                isAdmin : user.isAdmin
            },
                req.app.get('jwt-secret'),   // secret
            {                            // policy
                expiresIn : environment.jwt.expiresIn
            });
            return res.json({ token : token }).send()
        } else { // password incorrect
            return res.status(400).json(getErrorMessage(ErrorType.LoginFailed)).send()
        }
    }
    
}