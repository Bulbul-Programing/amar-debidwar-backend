import express from 'express';
import { validateUser } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserRole } from '../User/user.interface';
import { expenseValidation } from './expense.validation';
import { expenseController } from './expense.controller';

const router = express.Router()

router.post("/", validateUser(UserRole.ADMIN), validateRequest(expenseValidation.createExpenseSchema), expenseController.createExpense);
router.get("/", expenseController.getAllExpense)
router.get("/:id", expenseController.getSingleExpense);
router.patch("/:id", validateUser(UserRole.ADMIN), validateRequest(expenseValidation.updateExpenseSchema), expenseController.updateExpense);

export const expenseRoutes = router