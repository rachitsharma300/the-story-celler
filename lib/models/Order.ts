/**
 * DEPRECATED: This mongoose model is deprecated.
 * The database entity is now managed by the Spring Boot backend as Order entity.
 */

/*
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  orderId: string;
  productSlug: string;
  productName: string;
  quantity: number;
  occasion: string;
  pages: number;
  printingType: string;
  personalDetails: {
    name: string;
    age?: number;
    relationship?: string;
    aboutPerson?: string;
    specialMessage?: string;
  };
  uploadedPhotos: string[];
  frontCoverPhoto?: string;
  totalAmount: number;
  advanceAmount: number;
  status: "Pending" | "Designing" | "Review" | "Printing" | "Shipped" | "Delivered";
  finalPdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    productSlug: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    occasion: { type: String, required: true },
    pages: { type: Number, required: true },
    printingType: { type: String, required: true },
    personalDetails: {
      name: { type: String, required: true },
      age: { type: Number },
      relationship: { type: String },
      aboutPerson: { type: String },
      specialMessage: { type: String },
    },
    uploadedPhotos: { type: [String], default: [] },
    frontCoverPhoto: { type: String },
    totalAmount: { type: Number, required: true },
    advanceAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Designing", "Review", "Printing", "Shipped", "Delivered"],
      default: "Pending",
      required: true,
    },
    finalPdfUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
*/

// Export a dummy object to prevent import breakages
const Order = {} as any;
export default Order;

