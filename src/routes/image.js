import { Router } from "express";

import * as imageController from '@/controllers/image';
import * as imageValidation from '@/routes/validations/image';

import { isAuthenticated, isAdmin, validate } from '@/middlewares';

const router = Router();

router.route('/')
    .get(isAuthenticated, isAdmin, validate(imageValidation.getImages), imageController.getImages)
    .post(isAuthenticated, isAdmin, validate(imageValidation.createImage), imageController.createImage);

router.route('/:id')
    .get(isAuthenticated, isAdmin, validate(imageValidation.getImage), imageController.getImage)
    .put(isAuthenticated, isAdmin, validate(imageValidation.updateImage), imageController.updateImage)
    .delete(isAuthenticated, isAdmin, validate(imageValidation.deleteImage), imageController.deleteImage);

router.post('/upload', isAuthenticated, validate(imageValidation.uploadImage), imageController.uploadImage);

router.get('/:id/verify', isAuthenticated, validate(imageValidation.verifyImage), imageController.verifyImage);

router.get('/:id/reject', isAuthenticated, validate(imageValidation.rejectImage), imageController.rejectImage);

router.get('/:detectionID/verified', isAuthenticated, validate(imageValidation.getVerifiedImages), imageController.getVerifiedImages);

router.get('/:detectionID/unverified', isAuthenticated, validate(imageValidation.getUnverifiedImages), imageController.getUnverifiedImages);

router.get('/:detectionID/rejected', isAuthenticated, validate(imageValidation.getRejectedImages), imageController.getRejectedImages);

router.get('/:detectionID/current-image-to-verify', isAuthenticated, validate(imageValidation.getCurrentImageToVerify), imageController.getCurrentImageToVerify);

router.get('/:detectionID/next-image-to-verify', isAuthenticated, validate(imageValidation.getNextImageToVerify), imageController.getNextImageToVerify);

export default router;