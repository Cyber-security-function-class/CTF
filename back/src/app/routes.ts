'use strict'
import express, {Request, Response, NextFunction} from 'express'
import authController from './controllers/auth'
import challengeController from './controllers/challenge'
const router = express.Router()

router.use ('/api/auth',authController)
router.use ('/api/challenge',challengeController)

export default router