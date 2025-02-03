export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
        {
            detectionID: 1,
            imageURL: 'https://example.com/image1.jpg',
            verificationStatus: 'Verified'
        },
        {
            detectionID: 1,
            imageURL: 'https://example.com/image2.jpg',
            verificationStatus: 'Unverified'
        }
    ])
}