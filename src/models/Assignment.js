import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    startDate: Date,
    dueDate: Date,
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  },
  { timestamps: true }
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
