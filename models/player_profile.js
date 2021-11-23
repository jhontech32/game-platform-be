'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      player_profile.belongsTo(models.player, {foreignKey : 'player_id' , as : 'profile'})
    }
  };
  player_profile.init({
    full_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    city: DataTypes.STRING,
    player_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'player_profile',
  });
  return player_profile;
};