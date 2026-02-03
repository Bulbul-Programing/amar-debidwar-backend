import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { donationSectionCreateValidation, donationSectionUpdateValidation } from './donationSection.validation';
import { donationSectionController } from './donationSection.controller';

const router = express.Router()

router.post('/', validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(donationSectionCreateValidation), donationSectionController.createDonationSection)
router.get('/', donationSectionController.getAllDonationSection)
router.get('/:id', donationSectionController.getSingleDonationSection)
router.patch('/:id', validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(donationSectionUpdateValidation), donationSectionController.updateDonationSection)
router.delete('/:id', validateUser(UserRole.ADMIN, UserRole.MP), donationSectionController.deleteDonationSection)

export const donationSectionRoutes = router