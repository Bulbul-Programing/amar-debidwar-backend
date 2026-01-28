import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { serviceRecipientController } from './serviceRecipient.controller';
import { serviceREcipientSchema } from './serviceRecipient.validation';

const router = express.Router();

router.post('/', validateUser(UserRole.ADMIN), validateRequest(serviceREcipientSchema.createServiceRecipientSchema), serviceRecipientController.createServiceRecipient);
router.get('/', validateUser(UserRole.ADMIN), serviceRecipientController.getAllServiceRecipients);
router.get('/:id', validateUser(UserRole.ADMIN), serviceRecipientController.getServiceRecipientById);
router.patch('/:id', validateUser(UserRole.ADMIN), validateRequest(serviceREcipientSchema.updateServiceRecipientSchema), serviceRecipientController.updateServiceRecipient);
router.delete('/:id', validateUser(UserRole.ADMIN), serviceRecipientController.deleteServiceRecipient);

export const serviceRecipientRoutes = router;
