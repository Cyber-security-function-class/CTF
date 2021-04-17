
import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getChallenges, getChallenge, addChallenge, updateChallenge} from './challengeController'
import { addChallengeValidator, updateChallengeValidator } from "../../middlewares/validators/challengeValidator"


const routes = express.Router()

routes.use(authMiddleware)

routes.get('/getChallenges',getChallenges)
routes.get('/getChallenge',getChallenge)

routes.post('/addChallenge',addChallengeValidator() ,addChallenge)
routes.post('/updateChallenge',updateChallengeValidator() ,updateChallenge)
export default routes