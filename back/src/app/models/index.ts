'use strict';

import { Sequelize } from 'sequelize-typescript'
import dbconfig from '../config/dbconfig'
import { ChallengeFactory } from './Challenge';
import { CategoryFactory } from './Category';
import { SolvedFactory } from './Solved';
import { UserFactory } from './User'
// import models



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
    Category : CategoryFactory(sequelize),
    Solved : SolvedFactory(sequelize),
}

// Category <--> Challenge

db.Category.hasMany(db.Challenge, {
    sourceKey : "id",
    foreignKey : "category_id",
    onUpdate : 'cascade',
    onDelete : 'cascade',
})

db.Challenge.belongsTo(db.Category, {
    foreignKey : "category_id",
    targetKey : "id"
})

// Challenge <--> Solved <--> User
db.Challenge.hasMany(db.Solved, {
    sourceKey : "id",
    foreignKey : "challenge_id",
    onUpdate : 'cascade',
    onDelete : 'cascade'
})
db.User.hasMany(db.Solved, {
    sourceKey : "id",
    foreignKey : "challenge_id",
    onUpdate : 'cascade',
    onDelete : 'cascade'
})
db.Solved.belongsTo(db.Challenge,{
    foreignKey : "challenge_id",
    targetKey : "id"
})
db.Solved.belongsTo(db.User,{
    foreignKey : "user_id",
    targetKey : "id"
})
export default db

