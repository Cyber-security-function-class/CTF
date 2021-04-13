'use strict'
import express, {Request, Response, NextFunction} from 'express'
import authController from './controllers/auth'

const router = express.Router()

router.use ('/api/auth',authController)


export default router