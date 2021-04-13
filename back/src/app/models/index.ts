'use strict';

import { Sequelize } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import dbconfig from '../config/dbconfig'
// import models
import User from './User'


const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: 'postgres'
    }
)


console.log(typeof User(sequelize,DataTypes))

const db = {
    sequelize,
    User : User(sequelize, DataTypes)
}
export default db

