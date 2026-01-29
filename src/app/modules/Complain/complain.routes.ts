import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { complainController } from "./complain.controller";
import { createComplainSchema, updateComplainSchema } from "./complain.validation";

const router = express.Router();

router.post(
    "/",
    validateUser(UserRole.ADMIN),
    validateRequest(createComplainSchema),
    complainController.createComplain
);

router.get("/", complainController.getAllComplains);

router.get("/:id", complainController.getSingleComplain);

router.patch(
    "/:id",
    validateUser(UserRole.ADMIN),
    validateRequest(updateComplainSchema),
    complainController.updateComplain
);

router.delete(
    "/:id",
    validateUser(UserRole.ADMIN),
    complainController.deleteComplain
);

export const complainRoutes = router;
