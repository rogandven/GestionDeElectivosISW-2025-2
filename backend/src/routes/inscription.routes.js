"use strict";
import { Router } from "express";
import { createInscription, getInscriptions, getInscriptionById, updateInscription, deleteInscription } from "../controllers/inscription.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createInscription);
router.get("/", authenticateJwt, isAdmin, getInscriptions);
router.get("/:id", authenticateJwt, isAdmin, getInscriptionById);
router.put("/:id", authenticateJwt, isAdmin, updateInscription);
router.delete("/:id", authenticateJwt, isAdmin, deleteInscription);

export default router;
