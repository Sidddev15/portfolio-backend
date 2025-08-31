import { Router } from "express";
import projectsRouter from "./projects.routes.js";
import experienceRouter from "./experience.routes.js";
import educationRouter from "./education.routes.js";
import techRouter from "./tech.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true }));
router.use("/projects", projectsRouter);
router.use("/experience", experienceRouter);
router.use("/education", educationRouter);
router.use("/techstack", techRouter);

export default router;
