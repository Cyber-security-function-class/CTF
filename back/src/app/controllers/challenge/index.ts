
import express, { Request, Response, NextFunction } from "express"
import authMiddleware from "../../middlewares/auth"
import adminMiddleware from "../../middlewares/admin"
import { getChallenges, getChallenge, addChallenge, updateChallenge,deleteChallenge,authFlag} from './challengeController'

import { 
    addChallengeValidator, 
    updateChallengeValidator,
    deleteChallengeValidator,
    authFlagValidator,
    getChallengeValidator 
} from "../../middlewares/validators/challengeValidator"


const routes = express.Router()

routes.use(authMiddleware)

// normal user
routes.get('/getChallenges',getChallenges)
routes.get('/getChallenge',getChallengeValidator(),getChallenge)
routes.post('/authFlag',authFlagValidator(),authFlag)

// admin
routes.post('/addChallenge',adminMiddleware,addChallengeValidator() ,addChallenge)
routes.post('/updateChallenge',adminMiddleware,updateChallengeValidator() ,updateChallenge)
routes.post('/deleteChallenge',adminMiddleware,deleteChallengeValidator() ,deleteChallenge)


export default routes