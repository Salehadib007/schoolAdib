import { connectDB } from "@/lib/connectDB";
import Attendance from "@/models/Attendance";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "date";

  const total = await Attendance.countDocuments();
  const attendances = await Attendance.find()
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("studentId lessonId");

  return Response.json({ attendances, total });
});

export const POST = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();
  const data = await req.json();
  const attendance = await Attendance.create(data);
  return Response.json(attendance, { status: 201 });
});
