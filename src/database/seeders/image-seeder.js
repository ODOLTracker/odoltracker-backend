export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
        {
            detectionID: 1,
            imageURL: 'https://example.com/image1.jpg',
            cloudinaryPublicID: 'publicID1',
            verificationStatus: 'Verified',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            detectionID: 1,
            imageURL: 'https://example.com/image2.jpg',
            cloudinaryPublicID: 'publicID2',
            verificationStatus: 'Unverified',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
}