import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Order email service is temporarily disabled.",
    },
    { status: 503 }
  );
}