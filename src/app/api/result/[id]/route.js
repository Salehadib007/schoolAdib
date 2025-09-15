import { connectDB } from "@/lib/connectDB.js";
import Result from "@/models/Result";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const result = await Result.findById(context.params.id).populate(
    "examId assignmentId studentId"
  );
  if (!result) return new Response("Result not found", { status: 404 });
  return Response.json(result);
});

export const PUT = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Result.findByIdAndUpdate(context.params.id, data, {
    new: true,
  });
  if (!updated) return new Response("Result not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Result.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Result not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
