/**
 * DEPRECATED: This local API route handler is deprecated.
 * Payments are handled by the Spring Boot backend PaymentController endpoints.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "deprecated", 
    message: "Payment endpoints are hosted on the Spring Boot backend API." 
  });
}
