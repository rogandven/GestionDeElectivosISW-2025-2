"use strict";
import { Router } from "express";
import { createSchedule, getSchedules, getScheduleById, updateSchedule, deleteSchedule } from "../controllers/schedule.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createSchedule);
router.get("/", authenticateJwt, isAdmin, getSchedules);
router.get("/:id", authenticateJwt, isAdmin, getScheduleById);
router.put("/:id", authenticateJwt, isAdmin, updateSchedule);
router.delete("/:id", authenticateJwt, isAdmin, deleteSchedule);

export default router;
