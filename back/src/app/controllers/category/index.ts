'use strict';

import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getCategories,addCategory } from './categoryController'
import { addCategoryValidator } from "../../middlewares/validators/categoryValidator"

const routes = express.Router()

routes.use(authMiddleware)

routes.get('/getCategories',getCategories)

routes.post('/addCategory',addCategoryValidator() ,addCategory)

export default routes