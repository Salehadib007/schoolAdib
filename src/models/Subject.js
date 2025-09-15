import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Subject ||
  mongoose.model("Subject", subjectSchema);
