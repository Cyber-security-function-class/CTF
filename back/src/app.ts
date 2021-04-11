"use strict"

import express from "express"
import bodyParser from 'body-parser';
import errorhandler from 'strong-error-handler'
import { Routes } from './app/routes'

class App {
    public app : express.Application;
    public routes: Routes = new Routes();
    constructor() {
        this.app = express()
        this.config()
        this.errorHandler()
        this.routes.routes(this.app)
    }

    private config(): void{
        this.app.use(bodyParser.json({limit: '5mb'}))
        this.app.use(bodyParser.urlencoded({extended: true})) 
    }
    private errorHandler(): void {
        this.app.use(errorhandler({
            debug: process.env.ENV !== 'prod',
            log: true,
        }));
    } 
}

export default new App().app;