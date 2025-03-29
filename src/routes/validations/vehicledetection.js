import { body, param, query } from "express-validator";

export const getAllVehicleDetections = [
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
];

export const createVehicleDetection = [
    body("vehicleType").isString().withMessage("Vehicle Type must be a string"),
    body("detectionDateTime").isISO8601().withMessage("Detection Date Time must be a date"),
    body("status").isIn(["Overdimension", "Normal"]).withMessage("Status must be Overdimension or Normal"),
    body("tollGateID").isInt().withMessage("Tollgate ID must be an integer"),
];

export const getVehicleDetection = [
    param("id").isInt().withMessage("Vehicle Detection ID must be an integer"),
];

export const updateVehicleDetection = [
    param("id").isInt().withMessage("Vehicle Detection ID must be an integer"),
    body("vehicleType").isString().withMessage("Vehicle Type must be a string"),
    body("detectionDateTime").isISO8601().withMessage("Detection Date Time must be a date"),
    body("status").isIn(["Overdimension", "Normal"]).withMessage("Status must be Overdimension or Normal"),
    body("tollGateID").isInt().withMessage("Tollgate ID must be an integer")
];

export const deleteVehicleDetection = [
    param("id").isInt().withMessage("Vehicle Detection ID must be an integer"),
];

export const getOverdimensionVehicleDetections = [
    param("tollgateId").isInt().withMessage("Tollgate ID must be an integer"),
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
];

export const getNormalVehicleDetections = [
    param("tollgateId").isInt().withMessage("Tollgate ID must be an integer"),
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
];

export const getDailyVehicleDetectionCount = [
    param("tollgateId").isInt().withMessage("Tollgate ID must be an integer"),
];

export const getVehicleDetectionCountByDateRange = [
    query("startDate").isDate().withMessage("Start Date must be a date"),
    query("endDate").isDate().withMessage("End Date must be a date"),
    param("tollgateId").isInt().withMessage("Tollgate ID must be an integer"),
];

export const getVehicleDetectionByVehicleType = [
    param("vehicleType").isString().withMessage("Vehicle Type must be a string"),
    query("page").optional().isInt().withMessage("Page must be an integer"),
    query("limit").optional().isInt().withMessage("Limit must be an integer"),
];

export const getVehicleDetectionCountByVehicleType = [
    param("vehicleType").isString().withMessage("Vehicle Type must be a string"),
    param("tollgateId").isInt().withMessage("Tollgate ID must be an integer"),
];