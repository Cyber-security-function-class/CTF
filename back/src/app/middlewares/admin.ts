import { ErrorType, getErrorMessage } from '../error/index'

// admin middleware only use after auth middleware

export default (req, res, next) => {
    
    let isAdmin = req['decoded']?.isAdmin

    if(!isAdmin) {
        return res.status(403).json({
            error : getErrorMessage(ErrorType.AccessDenied),
            detail: 'only admin'
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            if (isAdmin) {
                resolve(true)
            } else {
                reject()
            }
        }
    )

    const onError = (error) => {
        res.status(400).json({
            error : getErrorMessage(ErrorType.AccessDenied),
            detail: "you are not a admin."
        })
    }
    p.then(()=>{
        next()
    }).catch(onError)
}