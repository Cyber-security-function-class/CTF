
import express from "express"
import { signInValidator, signUpValidator, getUserValidator, updateUserValidator, deleteUserValidator} from "../../middlewares/validators/userValidator"
import {createTeamValidator} from "../../middlewares/validators/teamValidator"
import { signUp, signIn, getUser,getUsers, deleteUser, updateUser} from './userController'
import { createTeam } from './teamController'
import authMiddleware from '../../middlewares/auth'

const routes = express.Router()

routes.post("/signUp",signUpValidator() , signUp)
routes.post("/signIn",signInValidator() , signIn)

routes.get('/getUser',authMiddleware)
routes.get('/getUser',getUserValidator(),getUser)

routes.get('/getUsers',authMiddleware)
routes.get('/getUsers',getUsers)

routes.post('/createTeam',authMiddleware)
routes.post('/createTeam',createTeamValidator(),createTeam)




// only admin
routes.post("/updateUser",authMiddleware)
routes.post("/updateUser",updateUserValidator(),updateUser)

routes.post("/deleteUser",authMiddleware)
routes.post("/deleteUser",deleteUserValidator(),deleteUser)


export default routes