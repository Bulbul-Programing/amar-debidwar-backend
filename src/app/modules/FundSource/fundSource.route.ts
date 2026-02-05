import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { fundSourceCreateValidation, fundSourceUpdateValidation } from './fundSource.validation';
import { fundSourceController } from './fundSource.controller';

const router = express.Router()

router.post('/', validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(fundSourceCreateValidation), fundSourceController.createFundSource)
router.get('/', fundSourceController.getAllFundSources)
router.get('/:id', validateUser(UserRole.ADMIN, UserRole.MP), fundSourceController.getFundSourceById)
router.patch('/:id', validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(fundSourceUpdateValidation), fundSourceController.updateFundSource)
router.delete('/:id', validateUser(UserRole.ADMIN, UserRole.MP), fundSourceController.deleteFundSource)

export const fundSourceRoutes = router