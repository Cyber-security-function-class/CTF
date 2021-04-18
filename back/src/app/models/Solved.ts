'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { ChallengeFactory } from "./Challenge";
import { UserFactory } from "./User";

export interface SolvedAttributes {
    id?: number
    score : number
    user_id : number
    challenge_id : number
    createdAt?: Date
    updatedAt?: Date
}
export interface SolvedModel extends Model<SolvedAttributes>, SolvedAttributes {}
export class Solved extends Model<SolvedModel, SolvedAttributes> {
    
}

export type SolvedStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SolvedModel
};


export function SolvedFactory (sequelize: Sequelize,User ,Challenge): SolvedStatic {
    return <SolvedStatic>sequelize.define("solved", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        score : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references :{
                model : User,
                key :'id' 
            }
        },
        challenge_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references :{
                model : Challenge,
                key :'id' 
            }
        }
    });
}