import Tech from "../models/Tech.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getTechStack = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = {};
  if (category) query.category = category;

  const docs = await Tech.find(query)
    .sort({ category: 1, order: 1, name: 1 })
    .lean();

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.json({ data: docs });
});
