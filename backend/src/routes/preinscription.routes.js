"use strict";
import { Router } from "express";
import { createPreinscription, getPreinscriptions, getPreinscriptionById, updatePreinscription, deletePreinscription } from "../controllers/preinscription.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createPreinscription);
router.get("/", authenticateJwt, isAdmin, getPreinscriptions);
router.get("/:id", authenticateJwt, isAdmin, getPreinscriptionById);
router.put("/:id", authenticateJwt, isAdmin, updatePreinscription);
router.delete("/:id", authenticateJwt, isAdmin, deletePreinscription);

export default router;
