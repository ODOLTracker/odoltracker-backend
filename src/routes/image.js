import { Router } from "express";

import * as imageController from '@/controllers/image';
import * as imageValidation from '@/routes/validations/image';

import { isAdmin, validate, upload } from '@/middlewares';

const router = Router();

router.route('/')
    .get(isAdmin, validate(imageValidation.getImages), imageController.getImages)
    .post(isAdmin, validate(imageValidation.createImage), imageController.createImage);

router.route('/:id')
    .get(isAdmin, validate(imageValidation.getImage), imageController.getImage)
    .put(isAdmin, validate(imageValidation.updateImage), imageController.updateImage)
    .delete(isAdmin, validate(imageValidation.deleteImage), imageController.deleteImage);

router.post('/upload', upload.single('image') ,validate(imageValidation.uploadImage), imageController.uploadImage);

router.get('/:id/verify', validate(imageValidation.verifyImage), imageController.verifyImage);

router.get('/:id/reject', validate(imageValidation.rejectImage), imageController.rejectImage);

router.get('/:detectionID/verified', validate(imageValidation.getVerifiedImages), imageController.getVerifiedImages);

router.get('/:detectionID/unverified', validate(imageValidation.getUnverifiedImages), imageController.getUnverifiedImages);

router.get('/:detectionID/rejected', validate(imageValidation.getRejectedImages), imageController.getRejectedImages);

router.get('/:detectionID/current-to-verify', validate(imageValidation.getCurrentImageToVerify), imageController.getCurrentImageToVerify);

router.get('/:detectionID/next-to-verify', validate(imageValidation.getNextImageToVerify), imageController.getNextImageToVerify);

export default router;