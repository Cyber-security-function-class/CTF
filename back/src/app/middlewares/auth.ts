import * as jwt from "jsonwebtoken"
import { ErrorType, getErrorMessage } from '../error/index'
import { validationResult } from "express-validator"

let allowUrl = [
    "/api/user/verifyEmail",
    "/api/user/resendEmail",
]

export default (req, res, next) => {
    
    let token = req.headers.authorization

    if(!token) {
        return res.status(403).json({
            error : getErrorMessage(ErrorType.AccessDenied),
            detail: 'not logged in'
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            token = token.split(' ')[1]
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => { 
                if(err) reject(err)
                else { 
                    if(!decoded.emailVerified) {
                        if(allowUrl.includes(req.originalUrl)) {
                            resolve(decoded)
                        }
                        reject({
                            error : getErrorMessage(ErrorType.NotVerifiedEmail),
                            detail:"email not verified"
                        })
                    } 
                    resolve(decoded)
                }
            })
        }
    )

    const onError = (error) => {
        if(error.error && error.error.errorType === 'notVerifiedEmail') {
            res.status(400).json(error)
        } else {
            console.log(error)
            res.status(500).json({
                error : getErrorMessage(ErrorType.UnexpectedError),
                detail: error.message
            })
        }
    }
    p.then((decoded)=>{
        req.decoded = decoded
        
        req["LogIp"] = req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        next()
    }).catch(onError)
}