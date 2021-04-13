'use strict'
import express, {Request, Response,NextFunction} from 'express'
import auth from './controllers/auth'


export class Routes {
    public routes(app): void {

        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).json({ result : true })
        })
    }
}