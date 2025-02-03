export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notifications', [
        {
            userID: 1,
            message: 'Welcome to the app!',
            status: 'Unread',
            timestamp: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userID: 1,
            message: 'New overdimension vehicle detected!',
            status: 'Unread',
            timestamp: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
}

async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
}