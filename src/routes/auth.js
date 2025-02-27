import { Router } from "express";

import * as authController from "@/controllers/auth";
import * as authValidation from "@/routes/validations/auth";
import {isAuthenticated, validate} from "@/middlewares";

const router = Router();

router.post("/register", validate(authValidation.registerRules), authController.register);
router.get("/verify-email", validate(authValidation.verifyEmailRules), authController.verifyEmail);
router.get("/resend-verification-email", validate(authValidation.resendVerificationEmailRules), authController.resendVerificationEmail);
router.post("/login", validate(authValidation.loginRules), authController.login);
router.get("/logout", isAuthenticated, validate(authValidation.logoutRules), authController.logout);
router.post("/forgot-password", validate(authValidation.forgotPasswordRules), authController.forgotPassword);
router.post("/reset-password", validate(authValidation.resetPasswordRules), authController.resetPassword);

export default router;