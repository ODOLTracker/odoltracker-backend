import db from '@/database';

/*
* GET /tollgate
* Get all tollgates
*/
export const getTollGates = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const tollgates = await db.models.TollGates.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        
        if (!tollgates) {
            return res.status(404).json({ message: 'No tollgates found' });
        }

        const totalPages = Math.ceil(tollgates.count / limit);
        const totalTollGates = tollgates.count;

        res.status(200).json(
            {
                message: 'Tollgates fetched successfully',
                tollgates: tollgates.rows,
                totalTollGates,
                totalPages,
                currentPage: page,
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /tollgates/:id
* Get a tollgate by id
*/
export const getTollGate = async (req, res) => {
    try {
        const { id } = req.params;
        const tollgate = await db.models.TollGates.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        res.status(200).json({
            message: 'Tollgate fetched successfully',
            tollgate,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* POST /tollgates
* Add a new tollgate 
*/
export const addTollGate = async (req, res) => {
    try {
        const { name, latitude, longitude, operatorID } = req.body;

        const tollgate = await db.models.TollGates.create({
            name,
            latitude,
            longitude,
            operatorID,
        });

        res.status(201).json({
            message: 'Tollgate added successfully',
            tollgate,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/* 
* PUT /tollgates/:id
* Update a tollgate
*/
export const updateTollGate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, latitude, longitude, operatorID } = req.body;

        const tollgate = await db.models.TollGates.findByPk(id);

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        tollgate.name = name;
        tollgate.latitude = latitude;
        tollgate.longitude = longitude;
        tollgate.operatorID = operatorID;

        await tollgate.save();

        res.status(200).json({
            message: 'Tollgate updated successfully',
            tollgate,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* DELETE /tollgates/:id
* Delete a tollgate
*/
export const deleteTollGate = async (req, res) => {
    try {
        const { id } = req.params;

        const tollgate = await db.models.TollGates.findByPk(id);

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        await tollgate.destroy();

        res.status(200).json({ message: 'Tollgate deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /tollgates/:id/operator
* Get the operator of a tollgate
*/
export const getTollGateOperator = async (req, res) => {
    try {
        const { id } = req.params;

        const tollgate = await db.models.TollGates.findByPk(id);

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        const operator = await db.Users.findByPk(tollgate.operatorID);

        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }

        res.status(200).json({
            message: 'Operator fetched successfully',
            operator,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// /*
// * GET /tollgates/:id/detection-results
// * Get detection results of a tollgate
// */
// export const getDetectionResultsOnTollGate = async (req, res) => {};

/* 
* GET /tollgates/managed-tollgates/:operatorId
* Get tollgates managed by operator
*/
export const getManagedTollGatesByOperator = async (req, res, next) => {
    try {
        const { operatorId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const tollgates = await db.models.TollGates.findAndCountAll({
            where: {
                operatorID: operatorId,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!tollgates) {
            return res.status(404).json({ message: 'No tollgates found' });
        }

        const totalPages = Math.ceil(tollgates.count / limit);
        const totalTollGates = tollgates.count;

        res.status(200).json(
            {
                message: 'Tollgates fetched successfully',
                tollgates: tollgates.rows,
                totalTollGates,
                totalPages,
                currentPage: page,
            }
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* PUT /tollgates/:id/operator
* Change the operator of a tollgate
*/
export const changeOperatorOfTollGate = async (req, res) => {
    try {
        const { id } = req.params;
        const { operatorID } = req.body;

        const tollgate = await db.models.TollGates.findByPk(id);

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        tollgate.operatorID = operatorID;

        await tollgate.save();

        res.status(200).json({
            message: 'Operator changed successfully',
            tollgate,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* POST /tollgates/:id/assign-operator/:operatorId
* Assign an operator to a tollgate
*/
export const assignTollGateToOperator = async (req, res) => {
    try {
        const { id, operatorID } = req.params;

        const tollgate = await db.models.TollGates.findByPk(id);

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        tollgate.operatorID = operatorID;

        await tollgate.save();

        res.status(200).json({
            message: 'Operator assigned successfully',
            tollgate,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* DELETE /tollgates/:id/remove-operator/
* Remove an operator from a tollgate
*/
export const removeTollGateFromOperator = async (req, res) => {
    try {
        const { id } = req.params;

        const tollgate = await db.models.TollGates.findByPk(id);

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        tollgate.operatorID = null;

        await tollgate.save();

        res.status(200).json({
            message: 'Operator removed successfully',
            tollgate,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /tollgates/:id/location
* Get the location of a tollgate
*/
export const getTollGateLocation = async (req, res) => {
    try {
        const { id } = req.params;

        const tollgate = await db.models.TollGates.findByPk(id, {
            attributes: ['name' , 'latitude', 'longitude'],
        });

        if (!tollgate) {
            return res.status(404).json({ message: 'Tollgate not found' });
        }

        res.status(200).json({
            message: 'Tollgate location fetched successfully',
            location: {
                name: tollgate.name,
                latitude: tollgate.latitude,
                longitude: tollgate.longitude,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*
* GET /tollgates/analytics
* Get analytics data of tollgates
*/
export const getTollGatesAnalyticsData = async (req, res) => {};

/*
* GET /tollgates/:id/analytics
* Get analytics data of specific tollgate
*/
export const getTollGateAnalyticsData = async (req, res) => {};