export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TollGates', [
        {
            name: 'Gerbang Tol Tandes Barat', 
            latitude: -7.238705262332343,
            longitude: 112.67806653414,
            operatorID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Gerbang Tol Dupak 1',
            latitude: -7.241228842366272,
            longitude:  112.71265523274367,
            operatorID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Gerbang Tol Dupak 2',
            latitude: -7.241594313484019, 
            longitude: 112.71202590634084,
            operatorID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TollGates', null, {});
}