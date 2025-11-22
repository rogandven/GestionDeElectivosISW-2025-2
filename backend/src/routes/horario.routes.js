"use strict";
import { Router } from "express";
import { asignarHorario,getHorarios,patchHorario,deleteHorario } from "../controllers/horario.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);
router.post("/asignar", asignarHorario);
router.get("/", getHorarios);
router.patch("/:id", patchHorario);
router.delete("/:id", deleteHorario);

export default router;
