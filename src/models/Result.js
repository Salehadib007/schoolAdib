import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    score: Number,
    examId: { type: Number, ref: "Exam" },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model("Result", resultSchema);
