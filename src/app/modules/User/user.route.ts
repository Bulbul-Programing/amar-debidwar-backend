import express from 'express';
import { userController } from './user.controller';;
import { UserRole } from './user.interface';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { userValidationSchema } from './user.validation';

const router = express.Router()

router.post('/', validateRequest(userValidationSchema.createUserSchema), userController.createUser)
router.post('/createAdmin', validateUser(UserRole.MP), validateRequest(userValidationSchema.createUserSchema), userController.createAdmin)
router.get('/', validateUser(UserRole.ADMIN, UserRole.MP), userController.getAllUsers)
router.get('/:id', validateUser(UserRole.MP, UserRole.ADMIN, UserRole.USER), userController.getSingleUser)
router.patch('/:userId', validateUser(UserRole.MP, UserRole.ADMIN, UserRole.USER), validateRequest(userValidationSchema.updateUserSchema), userController.updateUser)
router.delete('/:userId', validateUser(UserRole.MP), userController.deleteUser)
router.patch('/block/:userId', validateUser(UserRole.MP), userController.blockedUser)

export const userRoutes = router