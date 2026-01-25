import express from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { authValidation } from './auth.validation';

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginValidationSchema), authController.loginUser)
router.post("/logout", authController.logout)

export const authRouter = router