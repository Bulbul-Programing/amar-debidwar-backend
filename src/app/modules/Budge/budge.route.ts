import express from "express"
import { budgetController } from "./budge.controller"
import { validateRequest } from "../../middleware/validateRequest"
import { createBudgetSchema } from "./budge.validation"
import { validateUser } from "../../middleware/checkAuth"
import { UserRole } from "../User/user.interface"

const router = express.Router()

router.post("/", validateUser(UserRole.MP), validateRequest(createBudgetSchema), budgetController.createBudget)
router.get("/", validateUser(UserRole.ADMIN, UserRole.MP), budgetController.getAllBudgets)
router.get("/:id", validateUser(UserRole.ADMIN), budgetController.getSingleBudget)
router.patch("/:id", validateUser(UserRole.MP), budgetController.updateBudget)
router.delete("/:id", validateUser(UserRole.MP), budgetController.deleteBudget)

export const BudgetRoutes = router
