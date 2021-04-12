'use strict'

import {createServer} from 'http'
import app from './app'
import 'dotenv'
import sequelize from "./app/models"

const port = process.env.PORT || 7000;

(async () => {
    createServer(app).listen(port,async () => {
        await sequelize.authenticate()
        .then(async () => {
            console.log("database connection success");
        })
        .catch((e) => {
            console.log("database connection failed\n",e)
        })
        console.info(`Server running on port ${port}`)
    });
})();