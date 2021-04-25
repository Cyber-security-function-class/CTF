'use strict';

import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import adminMiddleware from "../../middlewares/admin"
import { getCategories, addCategory, updateCategory, deleteCategory} from './categoryController'
import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../../middlewares/validators/categoryValidator"

const routes = express.Router()

routes.use(authMiddleware)

routes.get('/getCategories',getCategories)


routes.post('/addCategory',adminMiddleware,addCategoryValidator() ,addCategory)
routes.post('/updateCategory',adminMiddleware,updateCategoryValidator() ,updateCategory)
routes.post('/deleteCategory',adminMiddleware,deleteCategoryValidator() ,deleteCategory)
export default routes