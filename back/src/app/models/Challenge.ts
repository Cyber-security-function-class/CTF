'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ChallengeAttributes {
    id?: number
    title : string
    score : number
    categoryId : number
    content : string
    flag : string
    createdAt?: Date
    updatedAt?: Date
}
export interface ChallengeModel extends Model<ChallengeAttributes>, ChallengeAttributes {}
export class Challenge extends Model<ChallengeModel, ChallengeAttributes> {
    
}

export type ChallengeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ChallengeModel
};


export function ChallengeFactory (sequelize: Sequelize): ChallengeStatic {
    return <ChallengeStatic>sequelize.define("challenge", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        score : {
            type : DataTypes.INTEGER,
            allowNull : false
        },  
        category_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        flag : {
            type : DataTypes.STRING,
            allowNull : false
        }
    });
}