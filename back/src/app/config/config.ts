'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

const environment = {
    mail : {
        service : process.env.mail_service,
        host : process.env.mail_host,
        port : process.env.mail_port,
        user : process.env.mail_user,
        pass : process.env.mail_pass,
    },
    jwt : {
        secret : process.env.jwtSecret || "secretjuju",
        expiresIn : "2days"
    }
}


export default environment