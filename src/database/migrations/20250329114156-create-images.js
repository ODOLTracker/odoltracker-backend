'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detectionID: {
        type: Sequelize.INTEGER
      },
      imageURL: {
        type: Sequelize.STRING
      },
      cloudinaryPublicID: {
        type: Sequelize.STRING
      },
      verificationStatus: {
        type: Sequelize.ENUM('Verified', 'Unverified', 'Rejected')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};