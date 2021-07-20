'use strict';

import environment from '../../config/config'

import {Request, Response} from 'express'

import * as jwt from 'jsonwebtoken'

import { validationResult } from "express-validator"
import { ErrorType, getErrorMessage } from '../../error/index'

import { Op } from 'sequelize'

import { 
    createHashedPassword, checkPassword,
} from '../../utils/user'

import { User } from '../../models/User'
import { Team } from '../../models/Team'
import { Solved } from '../../models/Solved'

export const signUp = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    // id,nickname,password,email,score,isAdmin,isVerified
    const nickname : string = req.body.nickname
    const password : string = req.body.password
    const email : string = req.body.email
    const hashedPassword = await createHashedPassword( password )

    // await check('nickname')
    const isExistingUser = await User.findOne({
        attributes : ['nickname','email'],
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
        return res.status(400).json({error : getErrorMessage(ErrorType.AlreadyExist),detail : msg}).send()
    }

    try {
        const user = await User.create({
            nickname : nickname,
            password : hashedPassword,
            email : email,
            score : 0,
            isAdmin : false
        })
        if (user) {
            return res.json({ result: true })
        } else {
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const signIn = async (req,res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const { email, password } = req.body
    let user
    try {
        user = await User.findOne({
            where : {email:email},
            raw : true,
            attributes: ['id', 'password', 'isAdmin', 'nickname'],
            include: [
                {
                    model: Team,
                    attributes: ["teamName"]
                }
            ]
        })
    } catch ( err ) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

    if ( user === null ) { // user not exist
        return res.status(400).json(getErrorMessage(ErrorType.NotExist)).send()
    } else { // user exist
        
        const result = await checkPassword (password,user.password) // sign in result
        
        if ( result ) { // password correct
            try {
                // make token
                const token = jwt.sign({    // payload
                    id: user.id,
                    nickname : user.nickname,
                    isAdmin : user.isAdmin,
                    
                },
                    req.app.get('jwt-secret'),   // secret
                {                            // policy
                    expiresIn : environment.jwt.expiresIn
                    });
                delete user.password
                delete user.isAdmin
                return res.json({ token : "Bearer "+token, user}).send()
            } catch (err) {
                return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError))
            }
        } 
        else { // password incorrect
            return res.status(400).json(getErrorMessage(ErrorType.LoginFailed)).send()
        }
    }
    
}

export const getUsers = async (req,res) => {
    try {
        const users = await User.findAll({
            attributes: ['id','nickname'],
            include: [{
                model : Team,
                attributes : ['id','teamName','leader']
            }],
            raw : true
        })
        res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const getUser = async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    let { id } = req.query

    try {
        const user = await User.findOne({
            where : {
                id : id
            },
            attributes : ['id','nickname','email','isAdmin'],
            include : [{
                model : Solved
            },{
                model: Team,
                attributes: [
                    "id","teamName","leader","score","createdAt","updatedAt"
                ]
            }]
        })
        if ( user !== null) {
            return res.json(user)
        }
        else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist), detail:"user doesn't exist"})
        }
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

}


export const updateUser = async (req, res) => { 
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    
    const { id, nickname, email, isAdmin } = req.body
    try {
        const isUserExist = await User.findOne({
            where : {
                id
            }, 
            attributes : ['id'],
            raw : true
        })
        
        if ( isUserExist !== null ){
            try {
                // update user
                await User.update(
                    {
                        nickname,email,isAdmin
                    },
                    { 
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
            return res.status(400).json({error : getErrorMessage(ErrorType.NotExist),detail:"user not exist"}).send()
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
    
}

export const deleteUser = async (req, res) => {
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
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
    } else {
        return res.status(400).json({error : getErrorMessage(ErrorType.NotExist),detail:"user not exist"}).send()
    }
}

export const getMe = async (req, res) => {
    const { id } = req.decoded

    try {
        const user = await User.findOne({
            where : {
                id : id
            },
            attributes : ['id','nickname','email','isAdmin'],
            include : [{
                model : Solved
            },{
                model: Team,
                attributes: [
                    "id","teamName","leader","score","createdAt","updatedAt"
                ]
            }]
        })
        if ( user !== null) {
            return res.json(user)
        }
        else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist), detail:"user doesn't exist"})
        }
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

}