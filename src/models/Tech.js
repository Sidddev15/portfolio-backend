import mongoose from "mongoose";

const TechSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true }, // Frontend | Backend | Database | Tools | Testing | Soft Skills
    icon: { type: String }, // e.g., "FaReact" (for react-icons mapping)
    level: { type: Number, min: 0, max: 100, default: 70 }, // proficiency
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TechSchema.index({ category: 1, order: 1, name: 1 });

TechSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model("Tech", TechSchema);
