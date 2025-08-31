import { Router } from "express";
import rateLimit from "express-rate-limit";
import { postContact } from "../controllers/contact.controller.js";

const router = Router();

// 5 requests / 10 minutes per IP (tweak to taste)
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact requests. Please try again later." },
});

router.post("/", contactLimiter, postContact);

export default router;
