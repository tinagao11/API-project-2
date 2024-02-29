'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Spot.belongsTo(models.User,{
        foreignKey: 'ownerId'
      })

      Spot.hasMany(models.Booking,{
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks:true
      })
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks:true
      })

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      // define association here
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate:{
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate:{
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING(49)
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    price: {
      type: DataTypes.DECIMAL,
      validate:{
        min: 0,
      }
    },

  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
