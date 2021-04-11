'use strict'
import express, {Request, Response,NextFunction} from 'express'
const router = express.Router()
export class Routes {
    public routes(app): void {
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).json({ result : true })
        })
    }
}