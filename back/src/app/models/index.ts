'use strict';
// get database config
import dbconfig from '../config/dbconfig'

// get sequelize
import { Sequelize } from 'sequelize-typescript'

//get models
import { Category } from './Category';
import { Challenge } from './Challenge';
import { Solved } from './Solved';
import { User} from './User'
import { Team } from './Team';
import { Notice } from './Notice';
import { EmailVerified } from './EmailVerified';

interface db {
    sequelize: Sequelize
}

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: 'postgres',
        logging : dbconfig.logging,
        models: [User, Category,Challenge,Solved,Team,Notice,EmailVerified]
    }
)

let db: db = {
    sequelize : sequelize
}

export default db