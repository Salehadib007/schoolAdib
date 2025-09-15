import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: String,
    startTime: Date,
    endTime: Date,
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", examSchema);
