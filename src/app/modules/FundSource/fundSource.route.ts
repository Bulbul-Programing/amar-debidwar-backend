import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { fundSourceCreateValidation, fundSourceUpdateValidation } from './fundSource.validation';
import { fundSourceController } from './fundSource.controller';

const router = express.Router()

router.post('/', validateUser(UserRole.ADMIN), validateRequest(fundSourceCreateValidation), fundSourceController.createFundSource)
router.get('/', validateUser(UserRole.ADMIN), fundSourceController.getAllFundSources)
router.get('/:id', validateUser(UserRole.ADMIN), fundSourceController.getFundSourceById)
router.patch('/:id', validateUser(UserRole.ADMIN), validateRequest(fundSourceUpdateValidation), fundSourceController.updateFundSource)
router.delete('/:id', validateUser(UserRole.ADMIN), fundSourceController.deleteFundSource)

export const fundSourceRoutes = router