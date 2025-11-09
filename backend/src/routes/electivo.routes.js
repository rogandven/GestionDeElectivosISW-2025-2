/*
import { Router } from "express";
import {
  getElectivos,
  createElectivo,
} from "../controllers/electivo.controller.js";
//import { isAuthenticated } from "../middleware/authentication.middleware.js";
import { authenticateJwt as isAuthenticated } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Rutas para electivos
router.get("/", isAuthenticated, getElectivos);
router.post("/", isAuthenticated, isAdmin, createElectivo);

export default router;
*/
"use strict";
import { Router } from "express";
import { getElectivo,getElectivos, getElectivoById, updateElectivoById, deleteElectivo, createElectivo } from "../controllers/electivo.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Middleware para autenticar el JWT
router.use(authenticateJwt);

// Rutas públicas
router.get("/electivos", getElectivos);

// Rutas para obtener electivos
router.get("/", getElectivo);
router.post("/", createElectivo);
router.get("/:id", getElectivoById);
router.put("/:id", updateElectivoById);
router.delete("/:id", deleteElectivo);

export default router;
