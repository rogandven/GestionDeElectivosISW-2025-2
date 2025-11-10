"use strict"

import { Router } from "express";
import { createElectivo,getElectivos,deleteElectivo,updateElectivo } from "../controllers/electivo.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.post("/Crear",authenticateJwt,createElectivo);
router.get("/Obtener",authenticateJwt,getElectivos);
router.delete("/Eliminar",authenticateJwt,deleteElectivo);
router.put("/Actualizar/:id",authenticateJwt,updateElectivo);

export default router;