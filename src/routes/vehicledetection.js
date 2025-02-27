import { Router } from "express";

import * as vehicleDetectionController from "@/controllers/vehicledetection";
import * as vehicleDetectionValidation from "@/routes/validations/vehicledetection";
import { isAuthenticated, validate, isAdmin } from '@/middlewares';

const router = Router();

router.route('/')
    .get(isAuthenticated, isAdmin, validate(vehicleDetectionValidation.getAllVehicleDetections), vehicleDetectionController.getAllVehicleDetections)
    .post(isAuthenticated, isAdmin, validate(vehicleDetectionValidation.createVehicleDetection), vehicleDetectionController.createVehicleDetection);

router.route('/:id')
    .get(isAuthenticated, isAdmin, validate(vehicleDetectionValidation.getVehicleDetection), vehicleDetectionController.getVehicleDetection)
    .put(isAuthenticated, isAdmin, validate(vehicleDetectionValidation.updateVehicleDetection), vehicleDetectionController.updateVehicleDetection)
    .delete(isAuthenticated, isAdmin, validate(vehicleDetectionValidation.deleteVehicleDetection), vehicleDetectionController.deleteVehicleDetection);

router.get('/:tollgateId/overdimension', isAuthenticated, validate(vehicleDetectionValidation.getOverdimensionVehicleDetections) ,vehicleDetectionController.getOverdimensionVehicleDetections);

router.get('/:tollgateId/normal', isAuthenticated, validate(vehicleDetectionValidation.getNormalVehicleDetections), vehicleDetectionController.getNormalVehicleDetections);

router.get('/daily-count', isAuthenticated, validate(vehicleDetectionValidation.getDailyVehicleDetectionCount), vehicleDetectionController.getDailyVehicleDetectionCount);

router.get('/date-range-count', isAuthenticated, validate(vehicleDetectionValidation.getVehicleDetectionCountByDateRange), vehicleDetectionController.getVehicleDetectionCountByDateRange);

router.get('/:vehicleType', isAuthenticated, validate(vehicleDetectionValidation.getVehicleDetectionByVehicleType), vehicleDetectionController.getVehicleDetectionByVehicleType);

router.get('/:vehicleType/count', isAuthenticated, validate(vehicleDetectionValidation.getVehicleDetectionCountByVehicleType), vehicleDetectionController.getVehicleDetectionCountByVehicleType);

export default router;