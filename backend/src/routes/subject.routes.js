"use strict";
import { Router } from "express";
import { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } from "../controllers/subject.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createSubject);
router.get("/", authenticateJwt, isAdmin, getSubjects);
router.get("/:id", authenticateJwt, isAdmin, getSubjectById);
router.put("/:id", authenticateJwt, isAdmin, updateSubject);
router.delete("/:id", authenticateJwt, isAdmin, deleteSubject);

export default router;
