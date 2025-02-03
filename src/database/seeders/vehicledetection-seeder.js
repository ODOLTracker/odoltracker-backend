export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VehicleDetections',[
        {
            vehicleType: "Pick Up",
            detectionDateTime: new Date(),
            status: "Normal",
            tollGateID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            vehicleType: "Truck Container",
            detectionDateTime: new Date(),
            status: "Overdimension",
            tollGateID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ])
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleDetections', null, {});
}