'use strict'

import {createServer} from 'http'
import app from './app'
import db from "./app/models"
import 'dotenv'


const port = process.env.PORT || 7000;

(async () => {
    createServer(app).listen(port,async () => {
        await db.sequelize.authenticate()
        .then(async () => {
            console.log("database connection success");
        })
        .catch((e) => {
            console.log("database connection failed\n",e)
        })
        console.info(`Server running on port ${port}`)
    });
})();