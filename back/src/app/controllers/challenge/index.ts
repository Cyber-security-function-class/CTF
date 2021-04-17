
import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getChallenges, getChallenge, addChallenge } from './challengeController'
import { addChallengeValidator } from "../../middlewares/validators/challengeValidator"


const routes = express.Router()

routes.use(authMiddleware)

routes.get('/getChallenges',getChallenges)
routes.get('/getChallenge',getChallenge)

routes.post('/addChallenge',addChallengeValidator() ,addChallenge)

export default routes