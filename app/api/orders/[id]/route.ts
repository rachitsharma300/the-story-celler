import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/lib/models/Order";

// PATCH: Update specific order status or final PDF url (used by Admin Panel)
export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;
    const body = await req.json();
    await connectToDatabase();

    const { status, finalPdfUrl } = body;

    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (finalPdfUrl !== undefined) updateFields.finalPdfUrl = finalPdfUrl;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: id },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
