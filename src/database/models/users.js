'use strict';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
export default (sequelize) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    async validatePassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    static associate(models) {
      Users.hasMany(models.TollGates, { foreignKey: 'operatorID' });
      Users.hasMany(models.Notifications, { foreignKey: 'userID' });
    }
  }
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }, 
    verificationToken: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Operator'),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Users',
    paranoid: false
  });
  return Users;
};