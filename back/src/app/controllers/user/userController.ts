import {Request, Response} from 'express'
import db from '../../models/index'
import * as jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import { validationResult } from "express-validator"
import environment from '../../config/config'
import { Op } from 'sequelize'
import { ErrorType, getErrorMessage } from '../../error/index'
import { UserModel } from '../../models/User'


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
            [Op.or]: [{ nickname: nickname}, { email : email }]
        },
        raw : true
    }) 

    if ( isExistingUser !== null ) {
        let msg: string
        if ( nickname === isExistingUser.nickname ) {
            msg = "The nickname already exist."
        } else {
            msg = "The email already exist."
        }
        return res.status(409).json({error : getErrorMessage(ErrorType.AlreadyExist),msg : msg}).send()
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
    const { email, password } = req.body
    let user : UserModel;
    try {
        user = await User.findOne({where : {email:email},raw : true})
    } catch ( err ) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

    if ( user === null ) { // user not exist
        return res.status(400).json(getErrorMessage(ErrorType.NotExist)).send()
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

export const getUser = async (req, res) => {
    if ( !req['decoded'].isAdmin) { // 이거 미들웨어로 만들어야할듯
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
    }
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }

    let { id } = req.query
    id = +id
    console.log(id)
    try {
        const user = await User.findOne({
            where : {
                id : id
            },
            attributes : ['id','nickname','email','score','isAdmin']
        })

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

}

export const updateUser = async (req, res) => { 
    if ( !req['decoded'].isAdmin) {
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }
    // check required things
    const { id,nickname, email, isAdmin, score } = req.body

    try {
        const isUserExist = await User.findOne({
            where : {
                id : id
            }, 
            attributes : ['id'],
            raw : true
        })
        if ( isUserExist !== null ){
            try {
                // update user
                const updatedUser = await User.update(
                    { 
                        nickname,
                        email,
                        isAdmin,
                        score
                    },{ 
                        where :{
                            id
                        }
                    }
                )
                res.json({result : true})
            } catch ( err ) {
                console.log(err)
                return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
            }
        } else {
            return res.status(400).json(getErrorMessage(ErrorType.NotExist)).send()
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
    
}

export const deleteUser = async (req, res) => {
    if ( !req['decoded'].isAdmin) {
        return res.status(403).json(getErrorMessage(ErrorType.AccessDenied)).send()
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), msg: errors.array() })
    }

    const { id } = req.body

    if ( await User.findOne({where : {id},raw : true, attributes:['id']}) !== null ){
        // user exist
        try {
            await User.destroy({where : {id}})
            return res.json({result : true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send() 
        }
    }
}