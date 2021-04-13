"use strict"

import express from "express"
import bodyParser from 'body-parser';
import errorhandler from 'strong-error-handler'
import routes from './app/routes'


const app = express()

// app.use(bodyParser.json({limit: '5mb'}))
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({limit: "2mb"}))
app.use("", routes)
app.use(errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));

export default app;