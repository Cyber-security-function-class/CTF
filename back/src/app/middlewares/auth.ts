import * as jwt from "jsonwebtoken"


export default (req, res, next) => {
    
    const token = req.headers.authorization

    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => { 
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}