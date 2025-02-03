import { Sequelize } from 'sequelize';

import * as config from '@/config/sequelize';

// import models
import imageModel from './models/images';
import notificationModel from './models/notifications';
import tollgateModel from './models/tollgates';
import userModel from './models/users';
import vehicledetectionModel from './models/vehicledetections';

// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Import all model files
const modelDefiners = [
  imageModel,
  notificationModel,
  tollgateModel,
  userModel,
  vehicledetectionModel,
];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
Object.keys(sequelize.models)
  .forEach((modelName) => {
    if (sequelize.models[modelName].associate) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  });

export default sequelize;