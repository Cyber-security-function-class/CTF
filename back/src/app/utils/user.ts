
import { genSalt, hash, compare } from 'bcrypt'
import nodemailer from 'nodemailer'
import environment from '../config/config'

export const createHashedPassword = async (password: string) => {
    const saltRounds = 10
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}

export const checkPassword = async (password: string, hashedPassword: string) => {
    const isPasswordCorrect = await compare(password, hashedPassword) // hash.toString for type checking hack
    return isPasswordCorrect
}

const transporter = nodemailer.createTransport({
    service: environment.mail.service,
    host: environment.mail.host,
    auth: {
      user: environment.mail.user,
      pass: environment.mail.pass
    }
});

export const send_auth_mail = (email,token) => {
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