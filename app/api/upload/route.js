import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // Get the file from the request

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");

    const uploadResponse = await cloudinary.v2.uploader.upload(
      `data:image/png;base64,${base64File}`,
      {
        folder: "temporary",
      }
    );

    const imageUrl = uploadResponse.secure_url;
    const publicId = uploadResponse.public_id;

    // Schedule deletion after 5 minutes
    setTimeout(async () => {
      await cloudinary.v2.uploader.destroy(publicId);
      console.log(`Image ${publicId} deleted.`);
    }, 5 * 60 * 1000);
    console.log(imageUrl);
    return NextResponse.json({
      imageUrl,
      message: "Uploaded successfully. Will be deleted in 5 minutes.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
