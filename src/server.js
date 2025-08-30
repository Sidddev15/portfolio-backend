import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:5173"];

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: false,
  })
);
app.use(morgan("dev"));

// Health route
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Start Server
const PORT = process.env.PORT || 5000;
connectDB.then(() => {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
});
