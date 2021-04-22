'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

const environment = {
    mail : {
        service : "gmail",
        host : "smtp.gmail.com",
        port : "587",
        user : "logconmail2021@gmail.com",
        pass : "P4sSvv0rd@2021"
    },
    jwt : {
        secret : process.env.jwtSecret || "secretjuju",
        expiresIn : "2days"
    }
}


export default environment