'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      player.hasOne(models.player_profile, {foreignKey : 'player_id' , as : 'profile'})
    }

    checkPassword = password => bcrypt.compareSync(password, this.password);

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }

      const rahasia = 'ini rahasia'

      const token = jwt.sign(payload, rahasia)
      return token;
    }

    static authenticate = async({username, password}) => {
      try{
        const user = await this.findOne({where : {username}})
        if(!user) return Promise.reject('User not found')
        const isPasswordValid = user.checkPassword(password)
        if(!isPasswordValid) return Promise.reject('Wrong password')
        return Promise.resolve(user)
      }catch(error){
        return Promise.reject(error)
      }
    }
  };
  player.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};