'use strict';

import express from "express"

// import from userValidator
import { 
    signUpValidator, signInValidator,
    getUserValidator, updateUserValidator, 
    deleteUserValidator, verifyEmailValidator
} from "../../middlewares/validators/userValidator"

// import from teamValidator
import {
    createTeamValidator, joinTeamValidator, 
    getTeamValidator
} from "../../middlewares/validators/teamValidator"

// import from controllers
import { 
    signUp, signIn, getUser, getUsers, 
    deleteUser, updateUser, verifyEmail, resendEmail
} from './userController'

import { createTeam, getTeam, getTeams, joinTeam } from './teamController'

import authMiddleware from '../../middlewares/auth'
import adminMiddleware from '../../middlewares/admin'

const routes = express.Router()

routes.post("/signUp",signUpValidator() , signUp)
routes.post("/signIn",signInValidator() , signIn)

routes.get('/getUser',authMiddleware)
routes.get('/getUser',getUserValidator(),getUser)

routes.get('/getUsers',authMiddleware)
routes.get('/getUsers',getUsers)

routes.post("/verifyEmail",authMiddleware)
routes.post("/verifyEmail",verifyEmailValidator(),verifyEmail)

routes.post("/resendEmail",authMiddleware)
routes.post("/resendEmail",resendEmail)

routes.post('/createTeam',authMiddleware)
routes.post('/createTeam',createTeamValidator(),createTeam)

routes.get('/getTeam',authMiddleware)
routes.get('/getTeam',getTeamValidator(),getTeam)

routes.get('/getTeams',authMiddleware)
routes.get('/getTeams',getTeams)

routes.post("/joinTeam",authMiddleware)
routes.post("/joinTeam",joinTeamValidator(),joinTeam)

// only admin
routes.post("/updateUser",authMiddleware,adminMiddleware)
routes.post("/updateUser",updateUserValidator(),updateUser)

routes.post("/deleteUser",authMiddleware,adminMiddleware)
routes.post("/deleteUser",deleteUserValidator(),deleteUser)



export default routes