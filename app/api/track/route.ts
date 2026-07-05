/**
 * DEPRECATED: This local API route handler is deprecated.
 * Tracking is handled by the Spring Boot backend DeliveryController / OrderController endpoints.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "deprecated", 
    message: "Tracking endpoints are hosted on the Spring Boot backend API." 
  });
}
