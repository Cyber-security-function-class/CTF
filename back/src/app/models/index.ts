'use strict';

import { Sequelize } from 'sequelize-typescript'
import dbconfig from '../config/dbconfig'
import { Category } from './Category';
import { Challenge } from './Challenge';
import { Solved } from './Solved';
import { User} from './User'
import { Team } from './Team';
import { Notice } from './Notice';

const db = {
    sequelize : new Sequelize(
        dbconfig.database,
        dbconfig.username,
        dbconfig.password,
        {
            host: dbconfig.host,
            dialect: 'postgres',
            logging : dbconfig.logging,
            models: [User, Category,Challenge,Solved,Team,Notice],
            repositoryMode: true,
        }
    )
}


export default db