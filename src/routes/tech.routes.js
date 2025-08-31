import { Router } from "express";
import { getTechStack } from "../controllers/tech.controller.js";

const router = Router();
router.get("/", getTechStack);

export default router;
