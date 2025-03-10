import {body, param, query} from 'express-validator';

export const getTollGates = [
    query('page').optional().isInt().withMessage('Page must be an integer'),
    query('limit').optional().isInt().withMessage('Limit must be an integer'),
];

export const getTollGate = [
    param('id').isInt().withMessage('Tollgate ID must be an integer'),
];

export const addTollGate = [
    body('name').isString().withMessage('Name must be a string'),
    body('latitude').isString().withMessage('Latitude must be a string'),
    body('longitude').isString().withMessage('Longitude must be a string'),
    body('operatorID').isInt().withMessage('Operator ID must be an integer'),
];

export const updateTollGate = [
    body('name').isString().withMessage('Name must be a string'),
    body('latitude').isString().withMessage('Latitude must be a string'),
    body('longitude').isString().withMessage('Longitude must be a string'),
    body('operatorID').isInt().withMessage('Operator ID must be an integer'),
];

// export const getDetectionResultsOnTollGate = [];

export const deleteTollGate = [
    param('id').isInt().withMessage('Tollgate ID must be an integer')
];

export const getTollGateOperator = [
    param('id').isInt().withMessage('Tollgate ID must be an integer')
];

export const getManagedTollGatesByOperator = [
    param('operatorId').isInt().withMessage('Operator ID must be an integer'),
    query('page').optional().isInt().withMessage('Page must be an integer'),
    query('limit').optional().isInt().withMessage('Limit must be an integer'),
];

export const changeOperatorOfTollGate = [
    body('operatorID').isInt().withMessage('Operator ID must be an integer'),
    param('id').isInt().withMessage('Tollgate ID must be an integer'),
];

export const assignTollGateToOperator = [
    param('id').isInt().withMessage('Tollgate ID must be an integer'),
    param('operatorId').isInt().withMessage('Operator ID must be an integer'),
];

export const removeTollGateFromOperator = [
    param('id').isInt().withMessage('Tollgate ID must be an integer'),
];

export const getTollGateLocation = [
    param('id').isInt().withMessage('Tollgate ID must be an integer'),
];

export const getTollGatesAnalyticsData = [];

export const getTollGateAnalyticsData = [];