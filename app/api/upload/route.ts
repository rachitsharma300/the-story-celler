import { NextRequest, NextResponse } from "next/server";
import { uploadBuffer } from "@/lib/cloudinary";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "storyceller";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // 1. Try Cloudinary upload first
      const result = await uploadBuffer(buffer, folder, file.name);
      return NextResponse.json({
        success: true,
        url: result.secure_url || result.url,
        source: "cloudinary",
      });
    } catch (cloudinaryError: any) {
      console.warn(
        "Cloudinary upload failed (e.g. file > 10MB Cloudinary limit), saving locally:",
        cloudinaryError?.message || cloudinaryError
      );

      // 2. Local disk fallback for large files (> 10MB) or Cloudinary limits
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${Date.now()}_${sanitizedName}`;
      const filePath = path.join(uploadsDir, fileName);

      await fs.writeFile(filePath, buffer);

      const localUrl = `/uploads/${fileName}`;

      return NextResponse.json({
        success: true,
        url: localUrl,
        source: "local",
      });
    }
  } catch (error: any) {
    console.error("Critical upload API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
