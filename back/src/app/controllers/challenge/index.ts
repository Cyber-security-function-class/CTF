
import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getChallenges } from './challengeController'
import { body, validationResult } from 'express-validator'
const routes = express.Router()

routes.get('/getChallenges',authMiddleware)
routes.get('/getChallenges',getChallenges)



export default routes