import Experience from "../models/Experience.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getExperience = asyncHandler(async (req, res) => {
  const docs = await Experience.find({})
    .sort({ endDate: -1, startDate: -1, order: 1 })
    .lean();

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.json({ data: docs });
});
