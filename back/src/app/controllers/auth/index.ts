
import express, { Request, Response, NextFunction } from "express"
import { signUpValidator } from "../../middlewares/userValidator"
import router from "../../routes"
import authController from './authController'
import { body, validationResult } from 'express-validator'
const routes = express.Router()


// routes.post("/signUp",)
routes.post("/signUp",signUpValidator() ,authController.signUp)
routes.post("/signUpTest",signUpValidator(), (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
        console.log(req.body)
        return res.json({result:true})
    }
});
export default routes