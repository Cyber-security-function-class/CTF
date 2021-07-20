"use strict"

import express from "express"
import errorhandler from 'strong-error-handler'
import routes from './app/routes'
import config from './app/config/config'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(cors());
app.use(express.json({limit: "5mb"}))
app.use("", routes)
app.set('jwt-secret', config.jwt.secret)
app.use(helmet())
app.use(errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));

export default app;