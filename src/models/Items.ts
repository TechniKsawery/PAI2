import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

const Item = mongoose.model("Item", ItemSchema);
export default Item;
