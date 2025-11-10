
/*
"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import electivoRoutes from "./electivo.routes.js";

const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

//ruta del electivo
router.use("/electivos", electivoRoutes);
*/
"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import electivoRoutes from "./electivo.routes.js"
import claseRoutes from "./clase.routes.js";

import nowRoutes from "./now.routes.js";
import inscripcionRoutes from "./inscripcion.routes.js"
const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/electivos", electivoRoutes);
router.use("/clases", claseRoutes);
router.use("/electivos3", nowRoutes);
router.use("/Inscripciones",inscripcionRoutes);
export default router;