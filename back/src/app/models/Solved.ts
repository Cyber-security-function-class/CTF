'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface SovledAttributes {
    id?: number
    score : number
    challenge_id : number
    user_id : number
    createdAt?: Date
    updatedAt?: Date
}
export interface SolvedModel extends Model<SovledAttributes>, SovledAttributes {}
export class Solved extends Model<SolvedModel, SovledAttributes> {
    
}

export type SolvedStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SolvedModel
};


export function SolvedFactory (sequelize: Sequelize): SolvedStatic {
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
            allowNull : false
        },
        challenge_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });
}