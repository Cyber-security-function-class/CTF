
import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import { getChallenges, getChallenge, addChallenge, updateChallenge,deleteChallenge,authFlag} from './challengeController'
import { addChallengeValidator, updateChallengeValidator,deleteChallengeValidator,authFlagValidator } from "../../middlewares/validators/challengeValidator"


const routes = express.Router()

routes.use(authMiddleware)

// normal user
routes.get('/getChallenges',getChallenges)
routes.get('/getChallenge',getChallenge)
routes.post('/authFlag',authFlagValidator(),authFlag)

// admin
routes.post('/addChallenge',addChallengeValidator() ,addChallenge)
routes.post('/updateChallenge',updateChallengeValidator() ,updateChallenge)
routes.post('/deleteChallenge',deleteChallengeValidator() ,deleteChallenge)


export default routes