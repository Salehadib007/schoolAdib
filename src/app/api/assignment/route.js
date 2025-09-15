import { connectDB } from "@/lib/connectDB";
import Assignment from "@/models/Assignment";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "startDate";

  const query = {
    title: { $regex: search, $options: "i" },
  };

  const total = await Assignment.countDocuments(query);
  const assignments = await Assignment.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("lessonId");

  return Response.json({ assignments, total });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const assignment = await Assignment.create(data);
  return Response.json(assignment, { status: 201 });
});
