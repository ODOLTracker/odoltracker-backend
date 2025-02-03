echo "Start seeding ..."

npx sequelize-cli db:seed --seed database/seeders/image-seeder.js
npx sequelize-cli db:seed --seed database/seeders/notification-seeder.js
npx sequelize-cli db:seed --seed database/seeders/tollgate-seeder.js
npx sequelize-cli db:seed --seed database/seeders/user-seeder.js
npx sequelize-cli db:seed --seed database/seeders/vehicledetection-seeder.js

echo "Seeding completed!"

# press any key to exit
read -n 1 -s -r -p "Press any key to exit"