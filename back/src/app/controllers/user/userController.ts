import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import { validationResult } from "express-validator"
import environment from '../../config/config'
import { Op } from 'sequelize'
import db from '../../models/index'
import { ErrorType, getErrorMessage } from '../../error/index'
import {User} from '../../models/User'
import {Solved} from "../../models/Solved"
import { Repository } from 'sequelize-typescript'
import { Team } from '../../models/Team'
import { EmailVerified } from '../../models/EmailVerified'
import nodemailer from 'nodemailer'


const teamRepository:Repository<Team> = db.sequelize.getRepository(Team)
const userRepository:Repository<User> = db.sequelize.getRepository(User)
const solvedRepository:Repository<Solved> = db.sequelize.getRepository(Solved)
const emailVerifiedRepository:Repository<EmailVerified> = db.sequelize.getRepository(EmailVerified)

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

const createToken = async (): Promise<string> => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 32; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

const transporter = nodemailer.createTransport({
    service: environment.mail.service,
    host: environment.mail.host,
    auth: {
      user: environment.mail.user,
      pass: environment.mail.pass
    }
});

const send_auth_mail = (email,token) => {
    const mailOptions = {
        from: environment.mail.user,
        to: email ,
        subject: '이메일 인증',
        text: '가입완료를 위해 <'+token+'> 를 입력해주세요!'
    };
    
    transporter.sendMail(mailOptions, (err, res) => {
        if(err){
            console.log(err)
        } else {
            console.log("auth mail to ",email)
        }
    });
}

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
    const isExistingUser = await userRepository.findOne({
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
        const user = await userRepository.create({
            nickname : nickname,
            password : hashedPassword,
            email : email,
            score : 0,
            isAdmin : false
        })
        const token = await createToken()
        if(user) {
            emailVerifiedRepository.create({
                userId : user.id,
                token : token,
                isVerified : false
            }) 
            console.log("sending auth mail")
            send_auth_mail(email,token)
            
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
        user = await userRepository.findOne({
            where : {email:email},
            raw : true,
            attributes : ['id','password','isAdmin','nickname'],
            include : [{
                model : emailVerifiedRepository,
                attributes : ['isVerified']
            }]
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
                    emailVerified : user['emailVerified.isVerified'],
                },
                    req.app.get('jwt-secret'),   // secret
                {                            // policy
                    expiresIn : environment.jwt.expiresIn
                });
                return res.json({ token : "Bearer "+token }).send()
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
        const users = await userRepository.findAll({
            attributes: ['id','nickname'],
            include: [{
                model : teamRepository,
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
        const user = await userRepository.findOne({
            where : {
                id : id
            },
            attributes : ['id','nickname','email','isAdmin'],
            include : [{
                model : solvedRepository
            },{
                model : teamRepository
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
    if ( !req['decoded'].isAdmin) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied)).send()
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    
    const { id, nickname, email, isAdmin } = req.body
    try {
        const isUserExist = await userRepository.findOne({
            where : {
                id
            }, 
            attributes : ['id'],
            raw : true
        })
        
        if ( isUserExist !== null ){
            try {
                // update user
                await userRepository.update(
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
    if ( !req['decoded'].isAdmin) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied)).send()
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { id } = req.body

    if ( await userRepository.findOne({where : {id},raw : true, attributes:['id']}) !== null ){
        // user exist
        try {
            await userRepository.destroy({where : {id}})
            return res.json({result : true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send() 
        }
    } else {
        return res.status(400).json({error : getErrorMessage(ErrorType.NotExist),detail:"user not exist"}).send()
    }
}

export const verifyEmail = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { token } = req.body 
    const userId = req['decoded'].id

    const emailVerified = await emailVerifiedRepository.findOne({
        where : {
            userId
        },
        attributes : ['id','token','isVerified'],
        raw : true
    })
    if ( emailVerified === null) {
        console.log("unknown user try to email verify")
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
    if(!emailVerified['isVerified']) {
        try {
            if (token === emailVerified['token']) {
                await emailVerifiedRepository.update({isVerified : true},{where :{ id:emailVerified['id']}})
                const token = jwt.sign({    // payload
                    id: userId,
                    nickname : req['decoded'].nickname,
                    isAdmin : req['decoded'].isAdmin,
                    emailVerified : true
                },
                    req.app.get('jwt-secret'),   // secret
                {                            // policy
                    expiresIn : environment.jwt.expiresIn
                });
                return res.json({ token : "Bearer "+token }).send()
            } else {
                return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: "token is not validate"})
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        // already verified
        return res.status(400).json({error : getErrorMessage(ErrorType.AlreadyExist), detail:"already verified"})
    }
}

export const resendEmail = async (req,res) => {
    const userId = req['decoded'].id
    let user
    try{
        user = await userRepository.findOne({
            where : {id : userId},
            raw : true,
            include : [{
                model : emailVerifiedRepository
            }]
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({error : getErrorMessage(ErrorType.UnexpectedError),detail:"maybe user is not Exist"})
    }
    let now = new Date()
    
    if ( user.updatedAt.valueOf() + (30 * 1000) < now.valueOf() ) { // 30 second
        if ( user.emailVerified.isVerified ) {
            return res.status(400).json({error : getErrorMessage(ErrorType.AlreadyExist),detail:"already verified"})
        }
        const token = await createToken()
        send_auth_mail(user.email,token)

        emailVerifiedRepository.update({
            token
        },{
            where : { 
                id : user.emailVerified.id
            }
        })
        res.json({result : true})
    } else {
        res.json({error : getErrorMessage(ErrorType.AccessDenied),detail:"Only one mail can be sent per 30 seconds."})
    }
}