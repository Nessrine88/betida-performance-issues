export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export interface CloudinaryResource {
    public_id: string;
}

export interface Image {
    publicId: string;
    title: string | undefined;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: "betida/originals",
    max_results: 100,
  });


const images: Image[] = result.resources.map((res: CloudinaryResource): Image => ({
    publicId: res.public_id,
    title: res.public_id.split("/").pop()?.replace(/[_-]/g, " "),
}));

  return NextResponse.json(images);
}