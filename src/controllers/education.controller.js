import Education from "../models/Education.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getEducation = asyncHandler(async (_req, res) => {
  const docs = await Education.find({})
    .sort({ order: 1, updatedAt: -1 })
    .lean();

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.json({ data: docs });
});
