
import express, { Request, Response, NextFunction } from "express"
import { signUpValidator } from "../../middlewares/userValidator"
import router from "../../routes"
import authController from './authController'
import { body, validationResult } from 'express-validator'
const routes = express.Router()


// routes.post("/signUp",)
routes.post("/signUp",signUpValidator() ,authController.signUp)
export default routes