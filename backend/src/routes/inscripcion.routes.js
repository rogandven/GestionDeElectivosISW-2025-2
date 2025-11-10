"use strict";

import { Router } from "express";
import { CreateInscripciones,getInscripciones,DeleteInscripciones,getInscripcion,gestionarInscripcion,getInscripcionesEnEspera,getNotificaciones} from "../controllers/inscripcion.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

router.post("/Crear", authenticateJwt, CreateInscripciones);
router.get("/Obtener", authenticateJwt,isAdmin,getInscripciones);
router.get("/notificar", authenticateJwt, getNotificaciones);
router.get("/Obtener2", authenticateJwt, getInscripcion);
router.delete("/Eliminar", authenticateJwt, DeleteInscripciones);

router.get("/admin/en-espera", authenticateJwt, isAdmin, getInscripcionesEnEspera);
router.put("/gestionar",authenticateJwt,isAdmin,gestionarInscripcion);

export default router;
