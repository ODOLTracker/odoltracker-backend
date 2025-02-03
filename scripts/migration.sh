npx sequelize-cli model:generate --name Users --attributes name:string,email:string,password:string,role:enum:'{Admin,Operator}',profilePicture:string
npx sequelize-cli model:generate --name TollGates --attributes name:string,latitude:double,longitude:double,operatorID:integer
npx sequelize-cli model:generate --name VehicleDetections --attributes vehicleType:string,detectionDateTime:date,status:enum:'{Overdimension,Normal}',tollGateID:integer
npx sequelize-cli model:generate --name Images --attributes detectionID:integer,imageURL:string,verificationStatus:enum:'{Verified,Unverified}'
npx sequelize-cli model:generate --name Notifications --attributes userID:integer,message:string,status:enum:'{Read,Unread}',timestamp:date