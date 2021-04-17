'use strict'
import express, {Request, Response, NextFunction} from 'express'
import userController from './controllers/user'
import challengeController from './controllers/challenge'
import categoryController from './controllers/category'
const router = express.Router()

router.use ('/api/user',userController)
router.use ('/api/challenge',challengeController)
router.use ('/api/category',categoryController)

export default router