'use strict';

import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getCategories, addCategory, updateCategory, deleteCategory} from './categoryController'
import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../../middlewares/validators/categoryValidator"

const routes = express.Router()

routes.use(authMiddleware)

routes.get('/getCategories',getCategories)


routes.post('/addCategory',addCategoryValidator() ,addCategory)
routes.post('/updateCategory',updateCategoryValidator() ,updateCategory)
routes.post('/deleteCategory',deleteCategoryValidator() ,deleteCategory)
export default routes