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
