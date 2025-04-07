import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true, minLength: 3 },
  price: { type: Number, required: true, min: 0, max: 10000 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);

