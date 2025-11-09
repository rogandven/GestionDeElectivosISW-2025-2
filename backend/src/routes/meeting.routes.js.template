"use strict";
import { Router } from "express";
import { createMeeting, getAllMeetings, getMeetingById, updateMeeting, deleteMeeting } from "../controllers/meeting.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas protegidas que requieren autenticación y rol de CEE
router.post("/", authenticateJwt, isAdmin, createMeeting);
router.get("/", authenticateJwt, isAdmin, getAllMeetings);
router.get("/:id", authenticateJwt, isAdmin, getMeetingById);
router.put("/:id", authenticateJwt, isAdmin, updateMeeting);
router.delete("/:id", authenticateJwt, isAdmin, deleteMeeting);

export default router;
