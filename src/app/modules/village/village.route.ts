import express from "express";
import { validateUser } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../User/user.interface";
import { VillageController } from "./village.controller";
import { createVillageSchema, updateVillageSchema } from "./village.validation";

const router = express.Router();

router.post("/", validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(createVillageSchema), VillageController.createVillage);
router.get("/", VillageController.getAllVillages);
router.get("/:id", VillageController.getSingleVillage);
router.patch("/:id", validateUser(UserRole.ADMIN, UserRole.MP), validateRequest(updateVillageSchema), VillageController.updateVillage);
router.delete("/:id", validateUser(UserRole.ADMIN, UserRole.MP), VillageController.deleteVillage);

export const villageRoutes = router;
