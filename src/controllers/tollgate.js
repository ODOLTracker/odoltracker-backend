import db from '@/database';

/*
* GET /tollgates
* Get all tollgates
*/
export const getTollGates = async (req, res) => {};

/*
* GET /tollgates/:id
* Get a tollgate by id
*/
export const getTollGate = async (req, res) => {};

/*
* POST /tollgates
* Add a new tollgate 
*/
export const addTollGate = async (req, res) => {};

/*
* GET /tollgates/:id/operator
* Get the operator of a tollgate
*/
export const getTollGateOperator = async (req, res) => {};

// /*
// * GET /tollgates/:id/detection-results
// * Get detection results of a tollgate
// */
// export const getDetectionResultsOnTollGate = async (req, res) => {};

/* 
* GET /tollgates/managed-tollgates/:operatorId
* Get tollgates managed by operator
*/
export const getManagedTollGatesByOperator = async (req, res, next) => {};

/*
* PUT /tollgates/:id/operator
* Change the operator of a tollgate
*/
export const changeOperatorOfTollGate = async (req, res) => {};

/*
* POST /tollgates/:id/assign-operator/:operatorId
* Assign an operator to a tollgate
*/
export const assignTollGateToOperator = async (req, res) => {};

/*
* DELETE /tollgates/:id/remove-operator/:operatorId
* Remove an operator from a tollgate
*/
export const removeTollGateFromOperator = async (req, res) => {};

/*
* GET /tollgates/:id/location
* Get the location of a tollgate
*/
export const getTollGateLocation = async (req, res) => {};

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