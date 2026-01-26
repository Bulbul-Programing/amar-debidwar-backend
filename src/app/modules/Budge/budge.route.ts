import express from "express"
import { budgetController } from "./budge.controller"

const router = express.Router()

router.post("/",budgetController.createBudget)
router.get("/",budgetController.getAllBudgets)
router.get("/:id",budgetController.getSingleBudget)
router.patch("/:id",budgetController.updateBudget)
router.delete("/:id",budgetController.deleteBudget)

export const BudgetRoutes = router
