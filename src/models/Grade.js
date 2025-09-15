import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    level: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Grade || mongoose.model("Grade", gradeSchema);
