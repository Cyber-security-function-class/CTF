import express from "express"
import authMiddleware from '../../middlewares/auth'
import adminMiddleware from '../../middlewares/admin'
import { addNoticeValidator, deleteNoticeValidator, getNoticeValidator, updateNoticeValidator } from "../../middlewares/validators/noticeValidator"

import {addNotice, deleteNotice, getNotice, getNotices, updateNotice} from "./noticeController"

const routes = express.Router()


routes.get("/getNotice",getNoticeValidator(),getNotice)
routes.get("/getNotices",getNotices)

routes.post("/addNotice",authMiddleware,adminMiddleware)
routes.post("/addNotice",addNoticeValidator(),addNotice)

routes.post("/updateNotice",authMiddleware,adminMiddleware)
routes.post("/updateNotice",updateNoticeValidator(),updateNotice)

routes.post("/deleteNotice",authMiddleware,adminMiddleware)
routes.post("/deleteNotice",deleteNoticeValidator() ,deleteNotice)

export default routes