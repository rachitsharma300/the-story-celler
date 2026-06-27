/**
 * DEPRECATED: This local API route handler is deprecated.
 * Use the Spring Boot backend OrderController endpoints instead.
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { success: false, error: "This endpoint is deprecated. Use the Spring Boot backend instead." },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, error: "This endpoint is deprecated. Use the Spring Boot backend instead." },
    { status: 501 }
  );
}

/*
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/lib/models/Order";

// GET: Retrieve all orders (for Admin Dashboard)
export async function GET() {
  try {
    await connectToDatabase();
    // Fetch orders sorted by creation time descending
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST: Place a new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const {
      productSlug,
      productName,
      quantity,
      occasion,
      pages,
      printingType,
      personalDetails,
      uploadedPhotos,
      frontCoverPhoto,
      totalAmount,
      advanceAmount,
    } = body;

    // Validation
    if (!productSlug || !productName || !occasion || !pages || !printingType || !personalDetails?.name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate Order ID like MV-2026-0001
    const currentYear = new Date().getFullYear();
    const count = await Order.countDocuments();
    const sequentialNum = String(count + 1).padStart(4, "0");
    const orderId = `MV-${currentYear}-${sequentialNum}`;

    // Create order document
    const newOrder = await Order.create({
      orderId,
      productSlug,
      productName,
      quantity: quantity || 1,
      occasion,
      pages,
      printingType,
      personalDetails,
      uploadedPhotos: uploadedPhotos || [],
      frontCoverPhoto,
      totalAmount,
      advanceAmount,
      status: "Pending",
    });

    return NextResponse.json({ success: true, data: newOrder });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
*/

