'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function hash(value, salt) {
    return new Promise(function (resolve, reject) {
        // value will be password, salt will be email
        if (value && salt) {
            reject({ msg: 'value or salt is empty' });
        }
        var iterateCount = 2048;
        var hash = crypto_1.default.createHmac('sha512', salt);
        for (var i = 1; i <= iterateCount; i++) {
            hash.update(value);
            if (i === iterateCount) {
                resolve(hash.digest('hex'));
            }
        }
    });
}
exports.default = (function (sequelize, DataTypes) {
    var UserModel = sequelize.define('User', {
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
            allowNull: false,
            set: function (value) {
                var _this = this;
                hash(value.password, value.email)
                    .then(function (hashedString) {
                    _this.setDataValue('password', hashedString);
                }).catch(function (err) {
                    console.log(err);
                });
            }
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