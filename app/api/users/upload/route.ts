import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
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
    // const form = new formidable.IncomingForm();
    const file = await req.formData()
    const avatar: File | null = file.get('file') as unknown as File
 console.log(avatar)

 const bytes = await avatar?.arrayBuffer();
 const buffer = Buffer.from(bytes);
//  console.log(buffer)

   // Upload file buffer to Cloudinary using upload_stream
   const result: UploadApiResponse = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw" },
      (error?: Error, result?: UploadApiResponse) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error("Unknown error occurred during upload"));
        }
      }
    );
    stream.end(buffer);
  });
  console.log(result?.secure_url)

      return NextResponse.json({
        message: `Uploaded`,
        success: true,
         fileUrl: result?.secure_url
    });
     
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred uploading" },
      { status: 500 }
  );
  }
}