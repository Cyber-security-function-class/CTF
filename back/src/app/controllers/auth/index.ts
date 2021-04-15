
import express from "express"
import { signInValidator, signUpValidator } from "../../middlewares/userValidator"
import { signUp, signIn} from './authController'
const routes = express.Router()



routes.post("/signUp",signUpValidator() , signUp)
routes.post("/signIn",signInValidator() , signIn)




export default routes