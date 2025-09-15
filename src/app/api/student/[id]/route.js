import { connectDB } from "@/lib/connectDB.js";
import Student from "@/models/Student";
import { withRole } from "@/lib/authorize";
import cloudinary from "@/lib/cloudinary";

export const GET = withRole(
  ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
  async (req, context) => {
    await connectDB();

    const student = await Student.findById(context.params.id);
    if (!student) {
      return new Response("Student not found", { status: 404 });
    }

    return Response.json(student);
  }
);

export const PUT = withRole(["ADMIN", "STUDENT"], async (req, context) => {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("img");
  const fields = Object.fromEntries(formData.entries());

  delete fields.img; // remove file before update

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

  const updated = await Student.findByIdAndUpdate(
    context.params.id,
    {
      ...fields,
      ...(imageUrl && { img: imageUrl }),
    },
    { new: true }
  );

  if (!updated) {
    return new Response("Student not found", { status: 404 });
  }

  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();

  const deleted = await Student.findByIdAndDelete(context.params.id);
  if (!deleted) {
    return new Response("Student not found", { status: 404 });
  }

  return Response.json({ message: "Deleted successfully" });
});
