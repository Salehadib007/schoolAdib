import { connectDB } from "@/lib/connectDB";
import Teacher from "@/models/Teacher";
import { withRole } from "@/lib/authorize";
import cloudinary from "@/lib/cloudinary";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();

  const teacher = await Teacher.findById(context.params.id);
  if (!teacher) {
    return new Response("Teacher not found", { status: 404 });
  }

  return Response.json(teacher);
});

export const PUT = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();

  const contentType = req.headers.get("content-type") || "";
  let updateData = {};

  if (contentType.includes("multipart/form-data")) {
    // Handle multipart form data for image upload
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
            folder: "school-management/teachers",
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

    updateData = {
      ...fields,
      ...(imageUrl && { img: imageUrl }),
    };
  } else {
    // JSON body fallback
    updateData = await req.json();
  }

  const updated = await Teacher.findByIdAndUpdate(
    context.params.id,
    updateData,
    {
      new: true,
    }
  );
  if (!updated) {
    return new Response("Teacher not found", { status: 404 });
  }

  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();

  const deleted = await Teacher.findByIdAndDelete(context.params.id);
  if (!deleted) {
    return new Response("Teacher not found", { status: 404 });
  }

  return Response.json({ message: "Deleted successfully" });
});
