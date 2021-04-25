import express from "express"
import authMiddleware from '../../middlewares/auth'

import {createNotice, deleteNotice, getNotice, getNotices, updateNotice} from "./noticeController"

const routes = express.Router()

routes.get("/getNotice",getNotice)
routes.get("/getNotices",getNotices)
routes.post("/createNotice",authMiddleware,createNotice)
routes.post("/updateNotice",authMiddleware,updateNotice)
routes.post("/deleteNotice",authMiddleware,deleteNotice)

export default routes