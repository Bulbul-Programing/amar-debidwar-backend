import express from "express"
import { projectController } from "./project.controller"
import { validateUser } from "../../middleware/checkAuth"
import { UserRole } from "../User/user.interface"
import { validateRequest } from "../../middleware/validateRequest"
import { createProjectSchema, updateProjectSchema } from "./project.validation"

const router = express.Router()

router.post("/", validateUser(UserRole.ADMIN), validateRequest(createProjectSchema), projectController.createProject)
router.get("/", projectController.getAllProjects)
router.get("/:id", projectController.getProjectById)
router.patch("/:id", validateUser(UserRole.ADMIN), validateRequest(updateProjectSchema), projectController.updateProject)
router.delete("/:id", validateUser(UserRole.ADMIN), projectController.deleteProject)

export const BudgetRoutes = router
