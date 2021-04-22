import * as jwt from "jsonwebtoken"
import { ErrorType, getErrorMessage } from '../error/index'
import { validationResult } from "express-validator"


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
                if(req.originalUrl == "/api/user/verifyEmail") {
                    resolve(decoded)
                }
                if(!decoded.emailVerified) {
                    reject({
                        error : getErrorMessage(ErrorType.NotVerifiedEmail),
                        detail:"email not verified"
                    })
                }
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        if(!error.error && error.error.errorType === 'notVerifiedEmail') {
            res.status(400).json(error)
        } else {
            res.status(400).json({
                error : getErrorMessage(ErrorType.UnexpectedError),
                detail: error.message
            })
        }
    }
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}