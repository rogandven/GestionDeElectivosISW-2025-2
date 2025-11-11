"use strict";
import { Router } from "express";
import { asignarClase, getClases, patchClase,deleteClase } from "../controllers/clase.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);
router.post("/asignar", asignarClase);
router.get("/", getClases);
router.patch("/:id", patchClase);
router.delete("/:id", deleteClase);

export default router;
