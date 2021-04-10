"use strict"

import * as express from "express"
// import { Routes } from "./routes/routes"; TODO router
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler'

class App {
    public app : express.Application;
    // public routes: Routes = new Routes();

    constructor() {
        this.app = express()
        this.config();
        // this.routes.routes(this.app);
        this.errorHandler();
    }

    private config(): void{
        this.app.use(bodyParser.json({limit: '5mb'}));
        this.app.use(bodyParser.urlencoded({extended: true}));
    }
    private errorHandler(): void {
        this.app.use(errorhandler({
            debug: process.env.ENV !== 'prod',
            log: true,
        }));
    } 
}

export default new App().app;