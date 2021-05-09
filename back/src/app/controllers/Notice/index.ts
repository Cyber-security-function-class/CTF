import express from "express"
import authMiddleware from '../../middlewares/auth'
import adminMiddleware from '../../middlewares/admin'
import { addNoticeValidator, deleteNoticeValidator, updateNoticeValidator } from "../../middlewares/validators/noticeValidator"

import {addNotice, deleteNotice, getCurrentNotice, getNotices, updateNotice} from "./noticeController"

const routes = express.Router()


routes.get("/getCurrentNotice",getCurrentNotice)

routes.get("/getNotices",getNotices)

routes.post("/addNotice",authMiddleware,adminMiddleware,addNoticeValidator(),addNotice)

routes.post("/updateNotice",authMiddleware,adminMiddleware,updateNoticeValidator(),updateNotice)

routes.post("/deleteNotice",authMiddleware,adminMiddleware,deleteNoticeValidator() ,deleteNotice)

export default routes