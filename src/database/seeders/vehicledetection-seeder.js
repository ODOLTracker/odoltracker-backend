export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VehicleDetections',[
        {
            vehicleType: "Pick Up",
            detectionDateTime: new Date(),
            status: "Normal",
            tollGateID: 1,
        },
        {
            vehicleType: "Truck Container",
            detectionDateTime: new Date(),
            status: "Overdimension",
            tollGateID: 2,
        },
    ])
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleDetections', null, {});
}