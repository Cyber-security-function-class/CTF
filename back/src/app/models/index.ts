'use strict';

import { Sequelize } from 'sequelize-typescript'
import dbconfig from '../config/dbconfig'


const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: 'postgres'
    }
)

export default sequelize