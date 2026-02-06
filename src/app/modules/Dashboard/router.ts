import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { UserRole } from '../../../../prisma/generated/prisma/enums';
import { dashboardController } from './dashboard.controller';

const router = express.Router()

router.get('/mp', validateUser(UserRole.MP), dashboardController.mpDashboardHome)

export const dashboardRouter = router