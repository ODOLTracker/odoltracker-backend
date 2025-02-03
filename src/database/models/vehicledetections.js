'use strict';
import { Model, DataTypes } from 'sequelize';
export default (sequelize) => {
  class VehicleDetections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VehicleDetections.init({
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detectionDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Overdimension', 'Normal'),
      allowNull: false
    },
    tollGateID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'VehicleDetections',
  });
  return VehicleDetections;
};