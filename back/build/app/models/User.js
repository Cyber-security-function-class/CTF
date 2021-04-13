'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// function hash(value : string, salt : string) : Promise<string> { 
//     return new Promise<string>((resolve, reject) => {
//         // value will be password, salt will be email
//         if ( value && salt ){
//             reject({msg : 'value or salt is empty'})
//         }
//         const iterateCount = 2048
//         let hash = crypto.createHmac('sha512', salt) // 여기서 오류 시발
//         for (let i = 1; i <= iterateCount; i++){
//             hash.update(value);
//             if ( i === iterateCount ) {
//                 resolve( hash.digest('hex') )
//             }
//         }
//     })
// }
exports.default = (function (sequelize, DataTypes) {
    var UserModel = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    console.log(UserModel);
    return UserModel;
});
//# sourceMappingURL=User.js.map