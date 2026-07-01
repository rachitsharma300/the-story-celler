import { NextRequest, NextResponse } from "next/server";
import { uploadBuffer } from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

// Helper function to save files locally in public/uploads directory
async function saveFileLocally(buffer: Buffer, filename: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Clean filename to prevent path traversal attacks
  const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = path.join(uploadDir, safeFilename);

  fs.writeFileSync(filePath, buffer);
  return `/uploads/${safeFilename}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "storyceller";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check if Cloudinary is configured
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud" &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== "your_key" &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_API_SECRET !== "your_secret";

    if (isCloudinaryConfigured) {
      try {
        // Upload to Cloudinary
        const result = await uploadBuffer(buffer, folder, file.name);
        return NextResponse.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
          source: "cloudinary",
        });
      } catch (cloudinaryError: any) {
        console.warn(
          "Cloudinary upload failed, falling back to local storage:",
          cloudinaryError.message || cloudinaryError
        );

        // Fallback to local storage on Cloudinary failure
        const localUrl = await saveFileLocally(buffer, file.name);
        return NextResponse.json({
          success: true,
          url: localUrl,
          source: "local",
        });
      }
    } else {
      // Cloudinary not configured, use local storage directly
      console.log("Cloudinary is not configured. Saving file to local storage.");
      const localUrl = await saveFileLocally(buffer, file.name);
      return NextResponse.json({
        success: true,
        url: localUrl,
        source: "local",
      });
    }
  } catch (error: any) {
    console.error("Error in upload API route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
