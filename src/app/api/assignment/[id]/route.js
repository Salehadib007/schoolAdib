import { connectDB } from "@/lib/connectDB.js";
import Assignment from "@/models/Assignment";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const assignment = await Assignment.findById(context.params.id).populate(
    "lessonId"
  );
  if (!assignment) return new Response("Assignment not found", { status: 404 });
  return Response.json(assignment);
});

export const PUT = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Assignment.findByIdAndUpdate(context.params.id, data, {
    new: true,
  });
  if (!updated) return new Response("Assignment not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Assignment.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Assignment not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
