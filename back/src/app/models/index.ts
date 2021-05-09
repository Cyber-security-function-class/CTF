'use strict';
// get database config
import dbconfig from '../config/dbconfig'

// get sequelize
import { Repository, Sequelize } from 'sequelize-typescript'

//get models
import { Category } from './Category';
import { Challenge } from './Challenge';
import { Solved } from './Solved';
import { User} from './User'
import { Team } from './Team';
import { Notice } from './Notice';
import { EmailVerified } from './EmailVerified';

interface repositories {
    userRepository : Repository<User>
    teamRepository : Repository<Team>
    categoryRepository : Repository<Category>
    challengeRepository : Repository<Challenge>
    solvedRepository : Repository<Solved>
    noticeRepository : Repository<Notice>
    emailVerifiedRepository : Repository<EmailVerified>
}

interface db {
    sequelize: Sequelize
    repositories: repositories
}

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: 'postgres',
        logging : dbconfig.logging,
        models: [User, Category,Challenge,Solved,Team,Notice,EmailVerified],
        repositoryMode: true,
    }
)

let repositories = {
    userRepository : sequelize.getRepository(User),
    teamRepository : sequelize.getRepository(Team),
    categoryRepository : sequelize.getRepository(Category),
    challengeRepository : sequelize.getRepository(Challenge),
    solvedRepository : sequelize.getRepository(Solved),
    noticeRepository : sequelize.getRepository(Notice),
    emailVerifiedRepository : sequelize.getRepository(EmailVerified)
}

let db: db = {
    sequelize : sequelize,
    repositories : repositories
}

export default db