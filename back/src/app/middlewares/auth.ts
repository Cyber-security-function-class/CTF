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
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            error : getErrorMessage(ErrorType.UnexpectedError),
            detail: error.message
        })
    }
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}