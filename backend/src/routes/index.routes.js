"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import careerRoutes from "./career.routes.js";
import inscriptionRoutes from "./inscription.routes.js";
import preinscriptionRoutes from "./preinscription.routes.js";
import scheduleRoutes from "./schedule.routes.js";
import subjectTemplateRoutes from "./subject_template.routes.js";
import subjectRoutes from "./subject.routes.js";




const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/careers", careerRoutes);
router.use("/inscriptions", inscriptionRoutes);
router.use("/preinscriptions", preinscriptionRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/subject_templates", subjectTemplateRoutes);
router.use("/subjects", subjectRoutes);

export default router;