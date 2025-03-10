import { Router } from "express";

import * as tollGateController from '@/controllers/tollgate';
import * as tollGateValidation from '@/routes/validations/tollgate';
import { validate, isAdmin } from '@/middlewares';

const router = Router();

// Admin only

router.route('/')
    .get(isAdmin, validate(tollGateValidation.getTollGates), tollGateController.getTollGates)
    .post(isAdmin, validate(tollGateValidation.addTollGate), tollGateController.addTollGate);

router.route('/:id')
    .get(isAdmin, validate(tollGateValidation.getTollGate), tollGateController.getTollGate)
    .put(isAdmin, validate(tollGateValidation.updateTollGate), tollGateController.updateTollGate)
    .delete(isAdmin, validate(tollGateValidation.deleteTollGate), tollGateController.deleteTollGate);

router.route('/:id/operator')
    .get(isAdmin, validate(tollGateValidation.getTollGateOperator), tollGateController.getTollGateOperator)
    .put(isAdmin, validate(tollGateValidation.changeOperatorOfTollGate), tollGateController.changeOperatorOfTollGate);

router.get('/analytics', isAdmin, validate(tollGateValidation.getTollGatesAnalyticsData), tollGateController.getTollGatesAnalyticsData);

// All users

router.get('/managed-tollgates/:operatorId', validate(tollGateValidation.getManagedTollGatesByOperator), tollGateController.getManagedTollGatesByOperator);

router.post('/:id/assign-operator/:operatorId', validate(tollGateValidation.assignTollGateToOperator), tollGateController.assignTollGateToOperator);

router.delete('/:id/remove-operator/:operatorId', validate(tollGateValidation.removeTollGateFromOperator), tollGateController.removeTollGateFromOperator);

// router.get('/:id/detection-results', isAuthenticated, validate(tollGateValidation.getDetectionResultsOnTollGate), tollGateController.getDetectionResultsOnTollGate);

router.get('/:id/location', validate(tollGateValidation.getTollGateLocation), tollGateController.getTollGateLocation);

router.get('/:id/analytics', validate(tollGateValidation.getTollGateAnalyticsData), tollGateController.getTollGateAnalyticsData);

export default router;