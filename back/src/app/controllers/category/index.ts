'use strict';

import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getCategories, addCategory, updateCategory } from './categoryController'
import { addCategoryValidator, updateCategoryValidator } from "../../middlewares/validators/categoryValidator"

const routes = express.Router()

routes.use(authMiddleware)

routes.get('/getCategories',getCategories)

routes.post('/addCategory',addCategoryValidator() ,addCategory)
routes.post('/updateCategory',updateCategoryValidator() ,updateCategory)

export default routes