import { Router } from "express";

import * as tollGateController from '@/controllers/tollgate';
import * as tollGateValidation from '@/routes/validations/tollgate';
import { isAuthenticated, validate, isAdmin } from '@/middlewares';

const router = Router();

// Admin only

router.route('/')
    .get(isAuthenticated, isAdmin, validate(tollGateValidation.getTollGates), tollGateController.getTollGates)
    .post(isAuthenticated, isAdmin, validate(tollGateValidation.addTollGate), tollGateController.addTollGate);

router.route('/:id')
    .get(isAuthenticated, isAdmin, validate(tollGateValidation.getTollGate), tollGateController.getTollGate)
    .put(isAuthenticated, isAdmin, validate(tollGateValidation.updateTollGate), tollGateController.updateTollGate)
    .delete(isAuthenticated, isAdmin, validate(tollGateValidation.deleteTollGate), tollGateController.deleteTollGate);

router.route('/:id/operator')
    .get(isAuthenticated, isAdmin, validate(tollGateValidation.getTollGateOperator), tollGateController.getTollGateOperator)
    .put(isAuthenticated, isAdmin, validate(tollGateValidation.changeOperatorOfTollGate), tollGateController.changeOperatorOfTollGate);

router.get('/analytics', isAuthenticated, isAdmin, validate(tollGateValidation.getTollGatesAnalyticsData), tollGateController.getTollGatesAnalyticsData);

// All users

router.get('/managed-tollgates/:operatorId', isAuthenticated, validate(tollGateValidation.getManagedTollGatesByOperator), tollGateController.getManagedTollGatesByOperator);

router.post('/:id/assign-operator/:operatorId', isAuthenticated, validate(tollGateValidation.assignTollGateToOperator), tollGateController.assignTollGateToOperator);

router.delete('/:id/remove-operator/:operatorId', isAuthenticated, validate(tollGateValidation.removeTollGateFromOperator), tollGateController.removeTollGateFromOperator);

// router.get('/:id/detection-results', isAuthenticated, validate(tollGateValidation.getDetectionResultsOnTollGate), tollGateController.getDetectionResultsOnTollGate);

router.get('/:id/location', isAuthenticated, validate(tollGateValidation.getTollGateLocation), tollGateController.getTollGateLocation);

router.get('/:id/analytics', isAuthenticated, validate(tollGateValidation.getTollGateAnalyticsData), tollGateController.getTollGateAnalyticsData);

export default router;