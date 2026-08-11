import { NextResponse } from "next/server";
import { getProducts } from "@/lib/content/load";

export const runtime = "nodejs";

export async function GET() {
  const productCount = getProducts().length;
  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      productCount,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
