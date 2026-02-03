import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { createComplaintCategorySchema, updateComplainCategorySchema } from "./complainCategory.validation";
import { complaintCategoryController } from "./complainCategory.controller";

const router = express.Router();

router.post("/", validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(createComplaintCategorySchema), complaintCategoryController.createComplaintCategory);
router.get("/", complaintCategoryController.getAllComplaintCategories);
router.get("/:id", complaintCategoryController.getSingleComplaintCategory);
router.patch("/:id", validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(updateComplainCategorySchema), complaintCategoryController.updateComplaintCategory);
router.delete("/:id", validateUser(UserRole.ADMIN, UserRole.MP), complaintCategoryController.deleteComplaintCategory);

export const complaintCategoryRoutes = router;
