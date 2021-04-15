
import express, { Request, Response, NextFunction } from "express"
import { signInValidator, signUpValidator } from "../../middlewares/userValidator"
import router from "../../routes"
import { signUp, signIn} from './authController'
import { body, validationResult } from 'express-validator'
const routes = express.Router()



routes.post("/signUp",signUpValidator() , signUp)
routes.post("/signIn",signInValidator() , signIn)




export default routes