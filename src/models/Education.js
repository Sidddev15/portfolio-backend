import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., B.Tech in CS
    institute: { type: String, required: true },
    period: { type: String, required: true }, // "2017 – 2021" (display string)
    link: String, // certificate/portfolio link
    highlights: [{ type: String }],
    skills: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

EducationSchema.index({ order: 1, updatedAt: -1 });

EducationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model("Education", EducationSchema);
