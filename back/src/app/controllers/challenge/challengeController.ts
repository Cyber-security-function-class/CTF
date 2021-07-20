import environment from '../../config/config';
import {Request, Response} from 'express'
import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator"
import { Op, Sequelize } from 'sequelize'
import { Challenge } from '../../models/Challenge'
import { User } from '../../models/User'
import { Team } from '../../models/Team'
import { Category } from '../../models/Category'
import { Solved } from '../../models/Solved'

import * as jwt from "jsonwebtoken"


interface IDynamicScoreUtils {
    minium: number
    decay: number
    score: number
    solvedCount: number
}

const getDecay = async () => {
    const userCount = await User.count()
    return userCount
}

const convertToDynamicScore = (utils: IDynamicScoreUtils) => {
    let newScore = (((utils.minium - utils.score)/(utils.decay**2)) * (utils.solvedCount**2)) + utils.score
    newScore = Math.ceil(newScore)
    return newScore
}

const convertToAppliedDynamicScore = (challenges) => {
    return new Promise( async (resolve) => {
        const decay = await getDecay()
        if (challenges.length === 0) {
            resolve(challenges)
        }
        challenges.forEach((challenge,index) => {
            const tmp: IDynamicScoreUtils = {
                minium: Number(environment.miniumScore),
                decay,
                score: challenge.score,
                solvedCount: challenge.solved_count,
            }
            challenges[index].score = convertToDynamicScore(tmp)
            if (index === challenges.length - 1) {
                resolve(challenges)
            }
        })
    })
    
}

const checkIsAuthed = (req) => new Promise((resolve, reject) => {
    let token = req.headers?.authorization
    token = token.split(' ')[1]

    if (!token) {
        resolve({isAuthed: false})
    }
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => { 
        if (err) {
            console.log(err)
            resolve({isAuthed: false})
        }
        else { 
            resolve({decoded, isAuthed: true})
        }
    })
})
    


export const getChallenges = async (req: Request, res: Response) => {
    const authInfo: any = await checkIsAuthed(req)
    const decoded = authInfo?.decoded
    const isAuthed = authInfo?.isAuthed

    const category = req.query['category']
    const attributes = [
        'id',
        'title',
        'score',
        'categoryId',
        'solved_count',
        'createdAt',
        'updatedAt'
    ]
    
    try {
        let challenges
        const include:Array<any> = [{
            model: Category,
            as: "category",
            attributes: ['category'],
        }]

        if (!category) {
            // get all challenges
            challenges = await Challenge.findAll({
                attributes,
                include,
                raw : true
            })
            let solveds = undefined
            if (isAuthed) {
                solveds = await Solved.findAll({
                    where: {
                        userId: decoded.id
                    },
                    raw: true
                })
            }
            const converted = await convertToAppliedDynamicScore(challenges)
            return res.json({challenges: converted,solveds:solveds})
        } else {
            // get challenges filtered by category query
            let f = []
            new Promise ((resolve) => {
                const filterList = category.toString().split(',')
                filterList.forEach((e,i) => {
                    let tmp = parseInt(e)
                    if ( !isNaN(tmp)) {
                        f.push({"categoryId" : tmp})
                    }
                    if(i >= filterList.length-1) {
                        resolve(f)
                    }
                })
            }).then( async (f) => {
                challenges = await Challenge.findAll({
                    where : {
                        [Op.or]: f
                    },
                    attributes,
                    include,
                    raw : true
                })
                let solveds = undefined
                if (isAuthed) {
                    solveds = await Solved.findAll({
                        where: {
                            userId: decoded.id
                        },
                        raw: true
                    })
                }
                const converted = await convertToAppliedDynamicScore(challenges)
                return res.json({challenges: converted,solveds:solveds})
            }).catch(err => {
                console.log(err)
                return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
            })
        }
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const getChallenge = async (req:Request, res:Response) => {
    // get by challenge id
    const { id } = req.query
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const attributes = [
        'id',
        'title',
        'score',
        'content',
        'categoryId',
        'solved_count',
        'createdAt',
        'updatedAt'
    ]
    try {
        const challenge = await Challenge.findOne({
            where : { 
                id : id
            },
            attributes,
            raw : true,
            include: [{
                model: Category,
                as: 'category'
            }]
        })
        if ( challenge !== null){
            const tmp: IDynamicScoreUtils = {
                score: challenge.score,
                decay: await getDecay(),
                minium: Number(environment.miniumScore),
                solvedCount: challenge.solved_count
            }
            const dynamicScore: number = convertToDynamicScore(tmp)
            const appliedDynamicScore = challenge
            appliedDynamicScore.score = dynamicScore
            return res.json(appliedDynamicScore)
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),"detail":"Challenge not exist"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }

}

export const addChallenge = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { title, score,categoryId, content, flag} = req.body
    
    try {
        if ( await Category.findOne({where : {id : categoryId}}) !== null) {
            if ( await Challenge.findOne({where : {flag}}) !== null) {
                return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail : "The same flag already exist."})
            }
            await Challenge.create({
                title,
                score,
                content,
                flag,
                categoryId,
            })
            return res.json({result : true})
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),"detail":"category not exist"})
        } 
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }

}

export const updateChallenge = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const {id,title,content,score,flag,categoryId} = req.body
    
    if ( await Challenge.findOne({where : id}) === null) {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }
    
    if( await Category.findOne({where : {id:categoryId}}) !== null) {
        try {
            await Challenge.update({
                title,
                content,
                score,
                flag,
                categoryId
            },{ 
                where : {id}
            })
            return res.json({result : true})
        } catch(err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),"detail":"category not exist"})
    }
}

export const deleteChallenge = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    
    const { id } = req.body
    if ( await Challenge.findOne({where:{id}}) !== null) {
        try {
            await Challenge.destroy({where:{id}})
            return res.json({result: true})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.NotExist),detail:"challenge doesn't exist"})
    }
}

export const authFlag = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const userId = req['decoded'].id
    const { flag } = req.body
    const user = await User.findOne({
        where : {id : userId},raw : true,
        include : [{
            model : Team,
            attributes : ['id']
        }]
    })

    if ( user === null) {
        console.log("unknown user")
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }
    
    const teamId = user['team.id']
    const challenge = await Challenge.findOne({where : {flag},raw : true})

    if ( teamId === null ) {
        return res.status(400).json({error:getErrorMessage(ErrorType.AccessDenied),detail:"you have to join a team before submit flag."})
    }
    if ( challenge === null ){
        return res.json({result : false}) // flag is wrong
    }
    
    // flag is correct
    const solved = await Solved.findOrCreate({
        where : {
            teamId,
            challengeId : challenge.id
        },
        defaults: { 
            userId,
            score : challenge.score
        }
    })
    if(solved[1]) { // solved
        // team점수 올리기
        const tmp: IDynamicScoreUtils = {
            score: challenge.score,
            decay: await getDecay(),
            minium: Number(environment.miniumScore),
            solvedCount: challenge.solved_count
        }
        const dynamicScore: number = convertToDynamicScore(tmp)
        try {
            await Team.update({score:Sequelize.literal('score + '+dynamicScore)},{where : {id : teamId}})
            await Challenge.update({solved_count: Sequelize.literal('solved_count + 1')},{where: {id: challenge.id}})
        } catch (err) {
            console.log(err)
            return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
        }
         
        return res.json({result : true})
    } else { // already solved
        return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail:"already solved"})
    }
}