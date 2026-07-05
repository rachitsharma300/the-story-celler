/**
 * DEPRECATED: This local API route handler is deprecated.
 * Products are handled by the Spring Boot backend ProductController endpoints.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "deprecated", 
    message: "Product endpoints are hosted on the Spring Boot backend API." 
  });
}
