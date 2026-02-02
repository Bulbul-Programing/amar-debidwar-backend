import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { expenseCategoryController } from './expenseCategory.controller';
import { createExpenseCategorySchema, updateExpenseCategorySchema } from './expenseCategory.validation';

const router = express.Router()

router.post("/", validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(createExpenseCategorySchema), expenseCategoryController.createExpenseCategory);
router.get("/", validateUser(UserRole.ADMIN, UserRole.MP), expenseCategoryController.getAllExpenseCategories);
router.get("/:id", validateUser(UserRole.ADMIN, UserRole.MP), expenseCategoryController.getExpenseCategoryById);
router.patch("/:id", validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(updateExpenseCategorySchema), expenseCategoryController.updateExpenseCategory);
router.delete("/:id", validateUser(UserRole.ADMIN, UserRole.MP), expenseCategoryController.blockExpenseCategory);

export const expenseCategoryRoutes = router