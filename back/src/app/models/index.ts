'use strict';

import { Sequelize } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import dbconfig from '../config/dbconfig'
// import models
import { UserFactory } from './User'


const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: 'postgres',
        logging : dbconfig.logging
    }
)


const db = {
    sequelize,
    User : UserFactory(sequelize)
}
export default db

