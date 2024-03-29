'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig} = require('../config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
           isEmail: true
      }
  },
    password: {
      type: DataTypes.STRING,
    allowNull:false,
    validate: {
      len: [3,10]    // length of password in between 3 to 10 length
    }
  }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate(function encrypt(user){
    //console.log("user object before the encryption", user);    // for better visulalize
    const encryptedPassword = bcrypt.hashSync(user.password, + ServerConfig.SALT_ROUNDS);
    user.password = encryptedPassword;
    //console.log("user object after encrytion" , user);
  });

  return User;
};