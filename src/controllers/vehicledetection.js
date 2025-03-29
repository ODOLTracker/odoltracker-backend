import db from '@/database'
import createError from 'http-errors';
import { Op } from 'sequelize';
/*
* GET /vehicledetection
* Get all vehicledetection
*/
export const getAllVehicleDetections = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const vehicledetections = await db.models.VehicleDetections.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!vehicledetections) {
            return next(createError(404, 'No vehicle detections found'));
        }

        const totalPages = Math.ceil(vehicledetections.count / limit);
        const totalVehicleDetections = vehicledetections.count;

        res.status(200).json(
            {
                message: 'Vehicle detections fetched successfully',
                vehicledetections: vehicledetections.rows,
                totalVehicleDetections,
                totalPages,
                currentPage: page
            }
        )
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* POST /vehicledetection
* Create new vehicledetection
*/
export const createVehicleDetection = async (req, res) => {
    try {
        const { vehicleType, detectionDateTime, status, tollGateID } = req.body;

        const tollgate = await db.models.TollGates.findByPk(tollGateID);

        if (!tollgate) {
            return next(createError(404, 'Tollgate not found'));
        }

        const vehicledetection = await db.models.VehicleDetections.create({
            vehicleType,
            detectionDateTime,
            status,
            tollGateID
        });

        res.status(201).json({
            message: 'Vehicle detection created successfully',
            vehicledetection
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /vehicledetection/:id
* Get vehicledetection by id
*/
export const getVehicleDetection = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicledetection = await db.models.VehicleDetections.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!vehicledetection) {
            return next(createError(404, 'No vehicle detection found'));
        }

        res.status(200).json({
            message: 'Vehicle detection fetched successfully',
            vehicledetection,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* PUT /vehicledetection/:id
* Update vehicledetection by id
*/
export const updateVehicleDetection = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehicleType, detectionDateTime, status, tollGateID } = req.body;

        const vehicledetection = await db.models.VehicleDetections.findByPk(id);

        if (!vehicledetection) {
            return next(createError(404, 'Vehicle detection not found'));
        }

        const tollgate = await db.models.TollGates.findByPk(tollGateID);

        if (!tollgate) {
            return next(createError(404, 'Tollgate not found'));
        }

        vehicledetection.vehicleType = vehicleType;
        vehicledetection.detectionDateTime = detectionDateTime;
        vehicledetection.status = status;
        vehicledetection.tollGateID = tollGateID;

        await vehicledetection.save();

        res.status(200).json({
            message: 'Vehicle detection updated successfully',
            vehicledetection
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* DELETE /vehicledetection/:id
* Delete vehicledetection by id
*/
export const deleteVehicleDetection = async (req, res) => {
    try {
        const { id } = req.params;

        const vehicledetection = await db.models.VehicleDetections.findByPk(id);

        if (!vehicledetection) {
            return next(createError(404, 'Vehicle detection not found'));
        }

        await vehicledetection.destroy();

        res.status(200).json({
            message: 'Vehicle detection deleted successfully',
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /vehicledetection/:tollGateID/overdimension
* Get all overdimension vehicledetection by tollgateId
*/
export const getOverdimensionVehicleDetections = async (req, res) => {
    try {
        const { tollgateId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const vehicledetections = await db.models.VehicleDetections.findAndCountAll({
            where: {
                tollGateID: tollgateId,
                status: 'Overdimension'
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!vehicledetections) {
            return next(createError(404, 'No overdimension vehicle detections found'));
        }

        const totalPages = Math.ceil(vehicledetections.count / limit);
        const totalVehicleDetections = vehicledetections.count;

        res.status(200).json(
            {
                message: 'Overdimension vehicle detections fetched successfully',
                vehicledetections: vehicledetections.rows,
                totalVehicleDetections,
                totalPages,
                currentPage: page
            }
        )
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /vehicledetection/:tollGateID/normal
* Get all normal vehicledetection by tollgateId
*/
export const getNormalVehicleDetections = async (req, res) => {
    try {
        const { tollgateId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const vehicledetections = await db.models.VehicleDetections.findAndCountAll({
            where: {
                tollGateID: tollgateId,
                status: 'Normal'
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!vehicledetections) {
            return next(createError(404, 'No normal vehicle detections found'));
        }

        const totalPages = Math.ceil(vehicledetections.count / limit);
        const totalVehicleDetections = vehicledetections.count;

        res.status(200).json(
            {
                message: 'Normal vehicle detections fetched successfully',
                vehicledetections: vehicledetections.rows,
                totalVehicleDetections,
                totalPages,
                currentPage: page
            }
        )
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /vehicledetection/daily-count/:tollgateId?date=2021-01-01
* Get daily vehicledetection count
*/

export const getDailyVehicleDetectionCount = async (req, res, next) => {
    try {
        const { tollgateId } = req.params;

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const overdimensionCount = await db.models.VehicleDetections.count({
            where: {
                tollGateID: tollgateId,
                status: 'Overdimension',
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay
                }
            }
        });

        const normalCount = await db.models.VehicleDetections.count({
            where: {
                tollGateID: tollgateId,
                status: 'Normal',
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay
                }
            }
        });

        res.status(200).json({
            message: 'Vehicle detection count fetched successfully',
            overdimensionCount,
            normalCount
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


/*
* GET /vehicledetection/date-range-count/:tollgateId?startDate=2021-01-01&endDate=2021-01-31
* Get vehicledetection count by date range
*/
export const getVehicleDetectionCountByDateRange = async (req, res) => {
    try {
        const { tollgateId } = req.params;
        const { startDate, endDate } = req.query;

        if (endDate < startDate) {
            return next(createError(400, 'End date must be greater than start date'));
        }

        const overdimensionCount = await db.models.VehicleDetections.count({
            where: {
                tollGateID: tollgateId,
                status: 'Overdimension',
                createdAt: {
                    [Op.gte]: new Date(startDate),
                    [Op.lt]: new Date(endDate + 'T23:59:59.999Z')
                }
            }
        });

        const normalCount = await db.models.VehicleDetections.count({
            where: {
                tollGateID: tollgateId,
                status: 'Normal',
                createdAt: {
                    [Op.gte]: new Date(startDate),
                    [Op.lt]: new Date(endDate + 'T23:59:59.999Z')
                }
            }
        });

        res.status(200).json({
            message: 'Vehicle detection count fetched successfully',
            overdimensionCount,
            normalCount
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /vehicledetection/:vehicleType/:tollgateId
* Get vehicledetection filter by vehicle type
*/
export const getVehicleDetectionByVehicleType = async (req, res) => {
    try {
        const { tollgateId, vehicleType } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const vehicledetections = await db.models.VehicleDetections.findAndCountAll({
            where: {
                tollGateID: tollgateId,
                vehicleType
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!vehicledetections) {
            return next(createError(404, 'No vehicle detections found'));
        }

        const totalPages = Math.ceil(vehicledetections.count / limit);
        const totalVehicleDetections = vehicledetections.count;

        res.status(200).json(
            {
                message: 'Vehicle detections fetched successfully',
                vehicledetections: vehicledetections.rows,
                totalVehicleDetections,
                totalPages,
                currentPage: page
            }
        )
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /vehicledetection/:vehicleType/:tollgateId/count
* Get vehicledetection count by vehicle type
*/
export const getVehicleDetectionCountByVehicleType = async (req, res) => {
    try {
        const { tollgateId, vehicleType } = req.params;

        const count = await db.models.VehicleDetections.count({
            where: {
                tollGateID: tollgateId,
                vehicleType
            }
        });

        res.status(200).json({
            message: 'Vehicle detection count fetched successfully',
            count
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};