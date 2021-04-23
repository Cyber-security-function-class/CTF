'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

const environment = {
    jwt : {
        secret : process.env.jwtSecret || "secretjuju",
        expiresIn : "2days"
    }
}


export default environment