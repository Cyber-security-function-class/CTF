'use strict';

import { Sequelize } from 'sequelize-typescript'
import dbconfig from '../config/dbconfig'
import { Challenge, ChallengeFactory } from './Challenge';
import { CategoryFactory } from './Category';
import { Solved, SolvedFactory } from './Solved';
import { User, UserFactory } from './User'
import { EmailVerifiedFactory } from './EmailVerified';
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
    EmailVerified : EmailVerifiedFactory(sequelize),
}

db['Solved'] = SolvedFactory(sequelize,User,Challenge)
// User <--> solved <--> challenge

db.User.belongsToMany(db.Challenge,{
    through : Solved,
})
db.Challenge.belongsToMany(db.User,{
    through : Solved,
})

export default db