
"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import electivoRoutes from "./electivo.routes.js";

const router = Router();


router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.use("/electivos", electivoRoutes);

export default router;
