"use strict";
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notEmpty: true,
            allowNull:false
        },
        mail: {
            type:DataTypes.STRING,
            isEmail:true,
            allowNull:false,
            notEmpty: true,
            isLowercase: true
        },
        username: {
            type:DataTypes.STRING,
            allowNull:false,
            notEmpty: true,
            isLowercase: true,
            len: [4,255]
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            notEmpty: true,
            len:[10,255],
            set      : function(val) {
                if(val != null){
                    this.setDataValue('password', crypto.createHash('sha256').update(val+"hash_random_string_i_will_generate"+this.getDataValue('inscription')).digest('hex'));
                }else{
                    this.setDataValue('password', null);
                }

            }
        },
        inscription: {
            type:DataTypes.DATE
        }

    });

    return User;
};