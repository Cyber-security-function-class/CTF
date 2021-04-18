'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ChallengeCategoryAttributes {
    id?: number
    challengeId : number
    categoryId : number
    createdAt?: Date
    updatedAt?: Date
}
export interface ChallengeCategoryModel extends Model<ChallengeCategoryAttributes>, ChallengeCategoryAttributes {}
export class ChallengeCategory extends Model<ChallengeCategoryModel, ChallengeCategoryAttributes> {
    
}

export type ChallengeCategoryStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ChallengeCategoryModel
};


export function ChallengeCategoryFactory (sequelize: Sequelize): ChallengeCategoryStatic {
    return <ChallengeCategoryStatic>sequelize.define("ChallengeCategory", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        challengeId : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });
}