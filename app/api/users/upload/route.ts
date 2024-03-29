import type { NextApiRequest, NextApiResponse } from 'next';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define API route handler
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const file = await req.formData()
    const avatar: File | null = file.get('file') as unknown as File
    const userId:string | null = file.get('userId')?.toString() ?? null;
    // console.log(avatar)
    // console.log(userId)

    const bytes = await avatar?.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //  console.log(buffer)

        // Specify a constant filename based on userId
    const filename = `${userId}.png`; // Or use appropriate file extension

    // Upload file buffer to Cloudinary using upload_stream
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: "image",
        folder: `reminder/avatars/${userId}`,
        public_id: filename, // Use the constant filename
        overwrite: true, // Specify overwrite to replace existing files

      },
      (error?: Error, result?: UploadApiResponse) => {
        if (error) {
          reject(error);
        } 
        else if (result) {
          resolve(result);
        } 
        else {
          reject(new Error("Unknown error occurred during upload"));
        }
      }
    );
    stream.end(buffer);
  });
  console.log(`curl`,result?.secure_url)

    return NextResponse.json({
      message: `Uploaded`,
      success: true,
      fileUrl: result?.secure_url
    });
  } 
  catch (error) {
    return NextResponse.json(
      { message: "Error occurred uploading" },
      { status: 500 }
  );
  }
}