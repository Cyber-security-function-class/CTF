import { ErrorType, getErrorMessage } from '../error/index'

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
        res.status(500).json({
            error : getErrorMessage(ErrorType.UnexpectedError),
            detail: error.message
        })
    }
    p.then(()=>{
        next()
    }).catch(onError)
}