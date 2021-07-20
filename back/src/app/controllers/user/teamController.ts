'use strict';
// import express
import { Request, Response } from "express";

// import sequelize
import { Repository } from "sequelize-typescript";
import db from '../../models/index'

// import models 

import { ErrorType, getErrorMessage } from '../../error/index'
import { validationResult } from "express-validator";

import { createHashedPassword, checkPassword } from "../../utils/user"

import { Team } from "../../models/Team"
import { User } from "../../models/User"
import { Solved } from "../../models/Solved"
import { Challenge } from "../../models/Challenge" 

export const getTeam = async (req : Request, res : Response) => { // get
    const { id } = req.query
    try {
        const team = await Team.findOne({
            where : {id},
            attributes: ['id','teamName','score'],
            include: [
                {
                model: User,
                attributes : ['id','nickname'],
                include : [{
                    model : Solved,
                    attributes : ['score'],
                    required : false,
                    include : [{
                        model : Challenge,
                        attributes : ['id','title']
                    }]
                }],
                required: false
            }]
        })
        if ( team !== null) {
            return res.json(team)
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist), detail:"team not exist"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
}

export const getTeams = async (req: Request, res: Response) => {
    try {
        const teams = await Team.findAll({
            attributes: ['id', 'teamName', 'score'],
            order: [
                ['score', 'DESC']
            ],
        })
        
        return res.json(teams)
    } catch (err) {
        return res.status(500).json({error:getErrorMessage(ErrorType.UnexpectedError)})
    }
}

export const createTeam = async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }

    const { teamName, teamPassword } = req.body
    const leaderId = req['decoded'].id
    
    let leader
    let hasTeam:boolean // is user has team
    try {
        leader = await User.findOne({where : {id:leaderId},raw:true, attributes:['teamId']})
        if ( leader ){
            // if user has team : true 
            hasTeam = ( leader.teamId !== null ) ? true : false
        } else { // user is not Exist, wtf?
            throw "unvalid user trying to make a team"
        }
    } catch (err) {
        return res.status(500).json({error:getErrorMessage(ErrorType.NotExist),detail : "cannot find user.."})
    }


    if ( !hasTeam ) {
        const hashedTeamPassword = await createHashedPassword(teamPassword)
        const newTeam = await Team.findOrCreate({
            where: { teamName },
            defaults: { 
                leader : leaderId,
                score : 0,
                teamPassword : hashedTeamPassword
            }
        })
        if (newTeam[1]){ // team already exists : false
            // join to team
            await User.update({
                teamId : newTeam[0].id
            },{
                where : { id : leaderId },
            })
            return res.json({
                result : newTeam[1],
                team : {
                    id : newTeam[0].id,
                    teamName : newTeam[0].teamName
                }
            })
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail:"same teamName is already exist."})
        }
    } else {
        return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist),detail:"you already joined another team!"})
    }
   
}

export const joinTeam = async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:getErrorMessage(ErrorType.ValidationError), detail: errors.array() })
    }
    const { teamName, teamPassword} = req.body
    const userId = req['decoded'].id

    try {
        const user = await User.findOne({where : {id : userId},attributes:['teamId'],raw : true})
        if (user.teamId !== null) {
            return res.status(400).json({error:getErrorMessage(ErrorType.AlreadyExist), detail:"already joined a team"})
        }
        const team = await Team.findOne({
            where : { 
                teamName
            },
            attributes : ['id','leader','teamPassword'],
            include: [{
                model : User,
                attributes : ['id','nickname']
            }]
        })
        if ( team !== null) {
            // max population of team == 3
            if ( team.users.length >= 3 ) {
                return res.status(400).json({error:getErrorMessage(ErrorType.AccessDenied), detail:"team is full"})
            }
            if ( await checkPassword(teamPassword,team.teamPassword) ) {
                await User.update({
                    teamId : team.id,
                },{
                    where : {
                        id : userId
                    }
                })
                return res.json({result: true})
            } else {
                return res.status(400).json({error:getErrorMessage(ErrorType.AccessDenied), detail:"password incorrect"})
            }
        } else {
            return res.status(400).json({error:getErrorMessage(ErrorType.NotExist), detail:"team not exist"})
        }
    } catch (err){
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError)).send()
    }
    
    
}