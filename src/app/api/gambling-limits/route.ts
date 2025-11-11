import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@sanity/client";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN!, 
  useCdn: false,
};

const client = createClient(config);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { limitType, limitAmount, limitPeriod } = body;

    // Validate input (optional, since Zod is used on frontend)
    if (!limitType || !limitAmount || !limitPeriod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create document in Sanity
    const document = await client.create({
      _type: "GamblingLimit",
      limitType,
      limitAmount: Number(limitAmount),
      limitPeriod,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (error) {
    console.error("Error creating gambling limit:", error);
    return NextResponse.json(
      { error: "Failed to create limit" },
      { status: 500 }
    );
  }
}
