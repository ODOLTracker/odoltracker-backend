'use strict';
import { Model, DataTypes } from 'sequelize';
export default (sequelize) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.belongsTo(models.Detections, { foreignKey: 'detectionID' });
    }
  }
  Images.init({
    detectionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationStatus: {
      type: DataTypes.ENUM('Verified', 'Unverified'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};