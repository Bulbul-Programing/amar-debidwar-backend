import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { expenseCategoryController } from './expenseCategory.controller';
import { createExpenseCategorySchema, updateExpenseCategorySchema } from './expenseCategory.validation';

const router = express.Router()

router.post("/", validateUser(UserRole.ADMIN), validateRequest(createExpenseCategorySchema), expenseCategoryController.createExpenseCategory);
router.get("/", validateUser(UserRole.ADMIN), expenseCategoryController.getAllExpenseCategories);
router.get("/:id", validateUser(UserRole.ADMIN), expenseCategoryController.getExpenseCategoryById);
router.put("/:id", validateUser(UserRole.ADMIN), validateRequest(updateExpenseCategorySchema), expenseCategoryController.updateExpenseCategory);
router.delete("/:id", validateUser(UserRole.ADMIN), expenseCategoryController.deleteExpenseCategory);

export const fundSourceRoutes = router