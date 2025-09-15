import { connectDB } from "@/lib/connectDB";
import Result from "@/models/Result";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "score";

  const total = await Result.countDocuments();
  const results = await Result.find()
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("examId assignmentId studentId");

  return Response.json({ results, total });
});

export const POST = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();
  const data = await req.json();
  const result = await Result.create(data);
  return Response.json(result, { status: 201 });
});
