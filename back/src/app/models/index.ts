'use strict';

import { Sequelize } from 'sequelize-typescript'
import dbconfig from '../config/dbconfig'
import { ChallengeFactory } from './Challenge';
import { CategoryFactory } from './Category';
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
    User : UserFactory(sequelize),
    Challenge : ChallengeFactory(sequelize),
    Category : CategoryFactory(sequelize)
}

// Category <--> Challenge

db.Category.hasMany(db.Challenge, {
    sourceKey : "id",
    foreignKey : "category_id"
})

db.Challenge.belongsTo(db.Category, {
    foreignKey : "category_id",
    targetKey : "id"
})



export default db

