'use strict';

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface EmailVerifiedAttributes {
    id : number
    email : string
    token : string
    createdAt?: Date
    updatedAt?: Date
}
export interface EmailVerifiedModel extends Model<EmailVerifiedAttributes>, EmailVerifiedAttributes {}
export class EmailVerified extends Model<EmailVerifiedModel, EmailVerifiedAttributes> {
    
}

export type EmailVerifiedStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): EmailVerifiedModel
};


export function EmailVerifiedFactory (sequelize: Sequelize): EmailVerifiedStatic {
    return <EmailVerifiedStatic>sequelize.define("email_verified", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique : true
        },
        email : {
            type : DataTypes.STRING,
            primaryKey: true,
        },
        token : {
            type : DataTypes.STRING,
            allowNull : false
        }
    });
}