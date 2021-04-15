import {Request, Response} from 'express'

export const getChallenges = async (req:Request, res:Response) => {

    res.json({result:true})
}

