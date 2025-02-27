import db from '@/database'

/*
* GET /vehicledetection
* Get all vehicledetection
*/
export const getAllVehicleDetections = async (req, res) => {};

/*
* POST /vehicledetection
* Create new vehicledetection
*/
export const createVehicleDetection = async (req, res) => {};

/*
* GET /vehicledetection/:id
* Get vehicledetection by id
*/
export const getVehicleDetection = async (req, res) => {};

/*
* PUT /vehicledetection/:id
* Update vehicledetection by id
*/
export const updateVehicleDetection = async (req, res) => {};

/*
* DELETE /vehicledetection/:id
* Delete vehicledetection by id
*/
export const deleteVehicleDetection = async (req, res) => {};

/*
* GET /vehicledetection/:tollgateId/overdimension
* Get all overdimension vehicledetection by tollgateId
*/
export const getOverdimensionVehicleDetections = async (req, res) => {};

/*
* GET /vehicledetection/:tollgateId/normal
* Get all normal vehicledetection by tollgateId
*/
export const getNormalVehicleDetections = async (req, res) => {};

/*
* GET /vehicledetection/daily-count
* Get daily vehicledetection count
*/
export const getDailyVehicleDetectionCount = async (req, res) => {};

/*
* GET /vehicledetection/date-range-count
* Get vehicledetection count by date range
*/
export const getVehicleDetectionCountByDateRange = async (req, res) => {};

/*
* GET /vehicledetection/:vehicleType
* Get vehicledetection filter by vehicle type
*/
export const getVehicleDetectionByVehicleType = async (req, res) => {};

/*
* GET /vehicledetection/:vehicleType/count
* Get vehicledetection count by vehicle type
*/
export const getVehicleDetectionCountByVehicleType = async (req, res) => {};