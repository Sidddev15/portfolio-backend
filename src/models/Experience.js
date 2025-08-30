import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true }, // store ISO dates for sorting
    endDate: { type: Date }, // null = Present
    location: String,
    highlights: [{ type: String }],
    skills: [{ type: String }],
    order: { type: Number, default: 0 }, // manual order if needed
  },
  { timestamps: true }
);

ExperienceSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model("Experience", ExperienceSchema);
