/**
 * Delhivery Logistics Helper Module (The Story Celler)
 * 
 * This file provides helper types and placeholder integrations for Delhivery Courier & Shipping API.
 * Currently logistics updates are processed via the Spring Boot backend (`DeliveryController.java`).
 */

export interface ShippingRequest {
  orderId: string;
  waybill?: string;
  customerName: string;
  address: string;
  pincode: string;
  phone: string;
}

export interface ShippingStatus {
  waybill: string;
  status: "Pending" | "Dispatched" | "In-Transit" | "Out for Delivery" | "Delivered";
  estimatedDelivery?: string;
}

/**
 * Placeholder for future direct client-side tracking lookup if needed.
 */
export async function trackShipment(waybill: string): Promise<ShippingStatus | null> {
  console.info(`[Delhivery] Direct tracking request for waybill: ${waybill}. Please use backend API /api/delivery/track.`);
  return null;
}
