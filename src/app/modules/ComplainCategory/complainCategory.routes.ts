import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { createComplaintCategorySchema, updateComplainCategorySchema } from "./complainCategory.validation";
import { complaintCategoryController } from "./complainCategory.controller";

const router = express.Router();

router.post("/", validateUser(UserRole.ADMIN), validateRequest(createComplaintCategorySchema), complaintCategoryController.createComplaintCategory);
router.get("/", complaintCategoryController.getAllComplaintCategories);
router.get("/:id", complaintCategoryController.getSingleComplaintCategory);
router.patch("/:id", validateUser(UserRole.ADMIN), validateRequest(updateComplainCategorySchema), complaintCategoryController.updateComplaintCategory);
router.delete("/:id", validateUser(UserRole.ADMIN), complaintCategoryController.deleteComplaintCategory);

export const complaintCategoryRoutes = router;
