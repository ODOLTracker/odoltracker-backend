'use strict';
import { Model, DataTypes } from 'sequelize';
export default (sequelize) => {
  class TollGates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TollGates.belongsTo(models.Users, { foreignKey: 'operatorID' });
      TollGates.hasMany(models.VehicleDetections, { foreignKey: 'tollGateID' });
    }
  }
  TollGates.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    operatorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TollGates',
  });
  return TollGates;
};