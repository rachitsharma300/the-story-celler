import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * GET /api/samples
 * Proxies to the Spring Boot backend and returns the samples list.
 * Used by the public /samples page to display Cloudinary-hosted covers & PDFs.
 */
export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/api/samples`, {
      // Revalidate every 60 s so new admin uploads appear quickly
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend responded with ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/samples] Failed to fetch from backend:", err);
    return NextResponse.json(
      { error: "Failed to connect to backend" },
      { status: 502 }
    );
  }
}
