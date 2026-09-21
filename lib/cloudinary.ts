import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadBuffer(
  buffer: Buffer,
  folder: string,
  filename?: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    let publicId: string | undefined = undefined;
    if (filename) {
      const nameWithoutExt = filename.includes(".")
        ? filename.split(".").slice(0, -1).join(".")
        : filename;
      publicId = nameWithoutExt.trim();
    }

    const isLargeFile = buffer.length > 10 * 1024 * 1024; // > 10MB

    const options: any = {
      folder: folder,
      public_id: publicId,
      resource_type: "auto",
    };

    let uploadStream;

    if (isLargeFile) {
      options.chunk_size = 6000000; // 6MB chunks for large files > 10MB
      uploadStream = cloudinary.uploader.upload_chunked_stream(
        options,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload_chunked_stream error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } else {
      uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload_stream error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    }

    uploadStream.end(buffer);
  });
}

export default cloudinary;
