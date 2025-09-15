import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    capacity: Number,
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
  },
  { timestamps: true }
);

export default mongoose.models.Class || mongoose.model("Class", classSchema);
