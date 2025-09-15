import { connectDB } from "@/lib/dbConnect";
import Grade from "@/models/Grade";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "level";

  const search = searchParams.get("search") || "";
  const query = {
    level: { $regex: search, $options: "i" },
  };

  const total = await Grade.countDocuments(query);
  const grades = await Grade.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({ grades, total });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const grade = await Grade.create(data);
  return Response.json(grade, { status: 201 });
});
