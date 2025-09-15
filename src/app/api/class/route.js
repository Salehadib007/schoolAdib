import { connectDB } from "@/lib/dbConnect";
import Class from "@/models/Class";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "createdAt";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const total = await Class.countDocuments(query);
  const classes = await Class.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("supervisorId gradeId");

  return Response.json({ classes, total });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const newClass = await Class.create(data);
  return Response.json(newClass, { status: 201 });
});
