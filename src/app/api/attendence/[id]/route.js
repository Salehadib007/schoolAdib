import { connectDB } from "@/lib/connectDB";
import Attendance from "@/models/Attendance";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const attendance = await Attendance.findById(context.params.id).populate(
    "studentId lessonId"
  );
  if (!attendance) return new Response("Attendance not found", { status: 404 });
  return Response.json(attendance);
});

export const PUT = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Attendance.findByIdAndUpdate(context.params.id, data, {
    new: true,
  });
  if (!updated) return new Response("Attendance not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Attendance.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Attendance not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
