'use strict';

import { Model, Sequelize,ModelDefined} from 'sequelize'
import crypto from 'crypto'


interface UserAttributes {
    id : number
    nickname : string
    password : string
    email : string 
    score : number 
    isAdmin : boolean
}
interface UserInstance extends Model<UserAttributes>, UserAttributes {}

// hashing function 
function hash(value : string, salt : string) : Promise<string> { 
    return new Promise<string>((resolve, reject) => {
        // value will be password, salt will be email
        if ( value && salt ){
            reject({msg : 'value or salt is empty'})
        }
        const iterateCount = 2048
        let hash = crypto.createHmac('sha512', salt)
        for (let i = 1; i <= iterateCount; i++){
            hash.update(value);
            if ( i === iterateCount ) {
                resolve( hash.digest('hex') )
            }
        }
    })
}

interface passwordSetAttribute {
    password : string, email : string
}

export default (sequelize : Sequelize,DataTypes) => {
    const UserModel : ModelDefined<UserAttributes,UserInstance> = sequelize.define(
        'User', {
            id : {
                type : DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nickname : {
                type : DataTypes.STRING,
                primaryKey: true
            },
            password : {
                type : DataTypes.STRING,
                allowNull : false,
                set( value:passwordSetAttribute ) { // value : { password : string, email : string }
                    hash(value.password, value.email)
                    .then(hashedString => {
                        this.setDataValue('password', hashedString);
                    }).catch ( err => {
                        console.log (err)
                    })
                }
            },
            email : {
                type : DataTypes.STRING,
                primaryKey: true
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
        }
    )
    return UserModel
}


/*
id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname : {
            type : DataTypes.STRING,
            primaryKey: true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            primaryKey: true
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
*/