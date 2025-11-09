"use strict";
import { Router } from "express";
import { createSubjectTemplate, getSubjectTemplates, getSubjectTemplateById, updateSubjectTemplate, deleteSubjectTemplate } from "../controllers/subject_template.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createSubjectTemplate);
router.get("/", authenticateJwt, isAdmin, getSubjectTemplates);
router.get("/:id", authenticateJwt, isAdmin, getSubjectTemplateById);
router.put("/:id", authenticateJwt, isAdmin, updateSubjectTemplate);
router.delete("/:id", authenticateJwt, isAdmin, deleteSubjectTemplate);

export default router;
