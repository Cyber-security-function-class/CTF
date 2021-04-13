"use strict"

import express from "express"
import bodyParser from 'body-parser';
import errorhandler from 'strong-error-handler'
import routes from './app/routes'
// import expressVaildator from 'express-vaildator'

const app = express()
// app.use(expressVaildator());

app.use(express.json({limit: "5mb"}))
app.use("", routes)
app.use(errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));

export default app;