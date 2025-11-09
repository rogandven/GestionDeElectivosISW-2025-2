"use strict";
import { Router } from "express";
import { createCareer, getCareers, getCareerById, updateCareer, deleteCareer } from "../controllers/career.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createCareer);
router.get("/", authenticateJwt, isAdmin, getCareers);
router.get("/:id", authenticateJwt, isAdmin, getCareerById);
router.put("/:id", authenticateJwt, isAdmin, updateCareer);
router.delete("/:id", authenticateJwt, isAdmin, deleteCareer);

export default router;
