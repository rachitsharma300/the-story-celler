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
    // Check if file is a PDF
    const isPdf = filename?.toLowerCase().endsWith(".pdf");
    const resourceType = isPdf ? "raw" : "auto";
    
    // For raw files like PDFs, keep the extension in the public_id to serve it correctly.
    // For other files, strip the extension.
    const publicId = filename
      ? (isPdf ? filename : filename.split(".").slice(0, -1).join("."))
      : undefined;

    // Use upload_chunked_stream for PDFs/large files to bypass the 10MB limit on standard raw uploads.
    // Use upload_stream for other files.
    const options: any = {
      folder: folder,
      public_id: publicId,
      resource_type: resourceType,
    };

    let uploadStream;

    if (isPdf) {
      options.chunk_size = 6000000; // 6MB chunks (Cloudinary requires >= 5MB chunk_size)
      uploadStream = cloudinary.uploader.upload_chunked_stream(
        options,
        (error, result) => {
          if (error) {
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
