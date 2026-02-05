import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { complainController } from "./complain.controller";
import { createComplainSchema, updateComplainSchema } from "./complain.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(createComplainSchema),
    complainController.createComplain
);

router.get("/", validateUser(UserRole.ADMIN, UserRole.MP), complainController.getAllComplains);

router.get("/:id", validateUser(UserRole.ADMIN, UserRole.MP), complainController.getSingleComplain);

router.patch(
    "/:id",
    validateUser(UserRole.ADMIN, UserRole.MP),
    validateRequest(updateComplainSchema),
    complainController.updateComplain
);

router.delete(
    "/:id",
    validateUser(UserRole.ADMIN, UserRole.MP),
    complainController.deleteComplain
);

export const complainRoutes = router;
