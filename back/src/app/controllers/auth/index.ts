
import express, { Request, Response, NextFunction } from "express"

import authController from './authController'

const routes = express.Router()

routes.post('/signUp',authController.signUp)

export default routes