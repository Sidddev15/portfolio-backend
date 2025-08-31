import Project from "../models/Project.js";
import asyncHandler from "../middleware/asyncHandler.js";

const DEFAULT_LIMIT = 50;

export const getProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = DEFAULT_LIMIT, featured, q } = req.query;

  const query = {};
  if (featured === "true") query.featured = true;
  if (q) {
    // simple case-insensitive search across title/description
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { techStack: { $regex: q, $options: "i" } },
    ];
  }

  const l = Math.min(Number(limit) || DEFAULT_LIMIT, 100);
  const p = Math.max(Number(page) || 1, 1);

  const [data, total] = await Promise.all([
    Project.find(query)
      .sort({ featured: -1, order: 1, updatedAt: -1 })
      .skip((p - 1) * l)
      .limit(l)
      .lean(),
    Project.countDocuments(query),
  ]);

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.json({ data, pagination: { total, page: p, limit: l } });
});
