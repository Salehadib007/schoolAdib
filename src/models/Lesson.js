import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    name: String,
    day: {
      type: String,
      enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    },
    startTime: Date,
    endTime: Date,
    subjectId: { type: Number, ref: "Subject" },
    classId: { type: Number, ref: "Class" },
    teacherId: { type: String, ref: "Teacher" },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
