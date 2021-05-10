'use strict'

import app from './app'
import db from "./app/models"
import 'dotenv'


const PORT = process.env.PORT || 7000;
let initCallback

app.listen ( PORT , async () => {
    await db.sequelize.authenticate().then(async () => {
        console.log("database connection success");
        const driver = async () => {
            try {
                await db.sequelize.sync();
            } catch (err) {
                console.error('database sycn failed');
                console.error(err);
                return;
            }
        
            console.log('database sync success');
        };
        await driver(); // sequelize sync

        
    })
    .catch((e) => {
        console.log("database connection failed\n",e)
    })
    console.info(`Server running on port ${PORT}`)
    if(initCallback) {
        console.log("initing server")
        initCallback();
    }
})

export const init = (cb) => {
    initCallback = cb;
}