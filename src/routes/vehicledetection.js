import { Router } from "express";

import * as vehicleDetectionController from "@/controllers/vehicledetection";
import * as vehicleDetectionValidation from "@/routes/validations/vehicledetection";
import {  validate, isAdmin } from '@/middlewares';

const router = Router();

router.route('/')
    .get( isAdmin, validate(vehicleDetectionValidation.getAllVehicleDetections), vehicleDetectionController.getAllVehicleDetections)
    .post( isAdmin, validate(vehicleDetectionValidation.createVehicleDetection), vehicleDetectionController.createVehicleDetection);

router.route('/:id')
    .get( isAdmin, validate(vehicleDetectionValidation.getVehicleDetection), vehicleDetectionController.getVehicleDetection)
    .put( isAdmin, validate(vehicleDetectionValidation.updateVehicleDetection), vehicleDetectionController.updateVehicleDetection)
    .delete( isAdmin, validate(vehicleDetectionValidation.deleteVehicleDetection), vehicleDetectionController.deleteVehicleDetection);

router.get('/:tollgateId/overdimension',  validate(vehicleDetectionValidation.getOverdimensionVehicleDetections) ,vehicleDetectionController.getOverdimensionVehicleDetections);

router.get('/:tollgateId/normal',  validate(vehicleDetectionValidation.getNormalVehicleDetections), vehicleDetectionController.getNormalVehicleDetections);

router.get('/daily-count/:tollgateId',  validate(vehicleDetectionValidation.getDailyVehicleDetectionCount), vehicleDetectionController.getDailyVehicleDetectionCount);

router.get('/date-range-count/:tollgateId',  validate(vehicleDetectionValidation.getVehicleDetectionCountByDateRange), vehicleDetectionController.getVehicleDetectionCountByDateRange);

router.get('/:vehicleType/:tollgateId',  validate(vehicleDetectionValidation.getVehicleDetectionByVehicleType), vehicleDetectionController.getVehicleDetectionByVehicleType);

router.get('/:vehicleType/:tollgateId/count',  validate(vehicleDetectionValidation.getVehicleDetectionCountByVehicleType), vehicleDetectionController.getVehicleDetectionCountByVehicleType);

export default router;