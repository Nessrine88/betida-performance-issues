export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    // Generate a low-quality blurred image
    const imageUrl = cloudinary.url(id, {
      transformation: [
        { width: 20, crop: "scale" },
        { effect: "blur:1000" },
        { fetch_format: "auto" },
      ],
    });

    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = `data:image/jpeg;base64,${Buffer.from(buffer).toString(
      "base64"
    )}`;

    const res = NextResponse.json({ base64 });
    res.headers.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=604800"
    );

    return res;
  } catch (err) {
    console.error("Cloudinary fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
