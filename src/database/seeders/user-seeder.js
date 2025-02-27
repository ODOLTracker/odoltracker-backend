export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
        {
            name: 'Ikhwanul Abiyu',
            email: 'ikhwanulabiyu@gmail.com',
            password: '$2a$12$OokdP/PrvFV4GIOg9tmy0e6lZGmOunZwYd0kELtNpTTWryjgTC9J2', // 123123 bcrypt factor 12
            verificationToken: "",
            isVerified: true,
            role: 'Admin',
            profilePicture: 'https://api.dicebear.com/7.x/lorelei/svg',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
}