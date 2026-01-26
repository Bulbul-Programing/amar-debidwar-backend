import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { donationSectionCreateValidation, donationSectionUpdateValidation } from './donationSection.validation';
import { donationSectionController } from './donationSection.controller';

const router = express.Router()

router.post('/', validateUser(UserRole.ADMIN), validateRequest(donationSectionCreateValidation), donationSectionController.createDonationSection)
router.get('/', validateUser(UserRole.ADMIN), donationSectionController.getAllDonationSection)
router.get('/:id', validateUser(UserRole.ADMIN), donationSectionController.getSingleDonationSection)
router.patch('/:id', validateUser(UserRole.ADMIN), validateRequest(donationSectionUpdateValidation), donationSectionController.updateDonationSection)
router.delete('/:id', validateUser(UserRole.ADMIN), donationSectionController.deleteDonationSection)

export const donationSectionRoutes = router