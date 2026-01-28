import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { VillageController } from "./village.controller";
import { createVillageSchema, updateVillageSchema } from "./village.validation";

const router = express.Router();

router.post("/", validateUser(UserRole.ADMIN), validateRequest(createVillageSchema), VillageController.createVillage);
router.get("/", validateUser(UserRole.ADMIN), VillageController.getAllVillages);
router.get("/:id", validateUser(UserRole.ADMIN), VillageController.getSingleVillage);
router.patch("/:id", validateUser(UserRole.ADMIN), validateRequest(updateVillageSchema), VillageController.updateVillage);
router.delete("/:id", validateUser(UserRole.ADMIN), VillageController.deleteVillage);

export const villageRoutes = router;
