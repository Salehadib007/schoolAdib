import { connectDB } from "@/lib/connectDB";
import Lesson from "@/models/Lesson";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const lesson = await Lesson.findById(context.params.id).populate(
    "subjectId classId teacherId"
  );
  if (!lesson) return new Response("Lesson not found", { status: 404 });
  return Response.json(lesson);
});

export const PUT = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Lesson.findByIdAndUpdate(context.params.id, data, {
    new: true,
  });
  if (!updated) return new Response("Lesson not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Lesson.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Lesson not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
