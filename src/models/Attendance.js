import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: Date,
    present: Boolean,
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  },
  { timestamps: true }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);
