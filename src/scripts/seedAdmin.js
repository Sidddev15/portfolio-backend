import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

async function run() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const pwd = process.env.ADMIN_PASSWORD;
  if (!email || !pwd) {
    console.error("❌ ADMIN_EMAIL / ADMIN_PASSWORD missing in .env");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(pwd, 10);

  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`✅ Admin updated: ${email}`);
  } else {
    await Admin.create({ email, passwordHash });
    console.log(`✅ Admin created: ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
});
