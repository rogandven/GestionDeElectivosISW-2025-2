"use strict";
import { Router } from "express";
import { createCareer, getCareers, getCareerById, updateCareer, deleteCareer } from "../controllers/career.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createCareer);
router.get("/", authenticateJwt, isAdmin, getCareers);
router.get("/:acronym", authenticateJwt, isAdmin, getCareerById);
router.put("/:acronym", authenticateJwt, isAdmin, updateCareer);
router.delete("/:acronym", authenticateJwt, isAdmin, deleteCareer);

export default router;
