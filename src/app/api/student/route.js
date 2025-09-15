import { connectDB } from "@/lib/connectDB.js";
import Student from "@/models/Student";
import { withRole } from "@/lib/authorize";
import cloudinary from "@/lib/cloudinary";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "createdAt";

  const query = {
    $or: [
      { username: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { surname: { $regex: search, $options: "i" } },
    ],
  };

  const total = await Student.countDocuments(query);
  const students = await Student.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({ students, total });
});

export const POST = withRole(["ADMIN"], async (req, context) => {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("img");
  const fields = Object.fromEntries(formData.entries());

  delete fields.img;

  let imageUrl;

  if (file && typeof file === "object") {
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "school-management/students",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    imageUrl = uploadResult.secure_url;
  }

  const newStudent = await Student.create({
    ...fields,
    ...(imageUrl && { img: imageUrl }),
  });

  return Response.json(newStudent, { status: 201 });
});
