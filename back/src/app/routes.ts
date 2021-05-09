'use strict'
import express from 'express'
import userController from './controllers/user'
import challengeController from './controllers/challenge'
import categoryController from './controllers/category'
import noticeController from './controllers/notice'
const router = express.Router()

router.use ('/api/user',userController)
router.use ('/api/challenge',challengeController)
router.use ('/api/category',categoryController)
router.use ('/api/notice',noticeController)

export default router