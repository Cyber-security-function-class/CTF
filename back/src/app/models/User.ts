'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    id?: number;
    nickname: string;
    password : string;
    score?: number;
    email: string;
    isAdmin ?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {
    
}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel
};

export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("user", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique : true
        },
        nickname : {
            type : DataTypes.STRING,
            primaryKey: true
        },
        email : {
            type : DataTypes.STRING,
            primaryKey: true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        score : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue :0
        },
        isAdmin : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    });
}