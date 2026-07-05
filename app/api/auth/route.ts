/**
 * DEPRECATED: This local API route handler is deprecated.
 * Auth is handled by the Spring Boot backend AuthController endpoints.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "deprecated", 
    message: "Auth endpoints are hosted on the Spring Boot backend API." 
  });
}
