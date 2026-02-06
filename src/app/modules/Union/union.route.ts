import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { UnionController } from "./union.controller";
import { createUnionSchema, updateUnionSchema } from "./union.validation";

const router = express.Router();

router.post(
    "/",
    validateUser(UserRole.ADMIN, UserRole.MP),
    validateRequest(createUnionSchema),
    UnionController.createUnion
);

router.get(
    "/",
    UnionController.getAllUnions
);

router.get(
    "/:id",
    UnionController.getSingleUnion
);

router.patch(
    "/:id",
    validateUser(UserRole.ADMIN),
    validateRequest(updateUnionSchema),
    UnionController.updateUnion
);

router.delete(
    "/:id",
    validateUser(UserRole.ADMIN),
    UnionController.deleteUnion
);

export const unionRoutes = router;
