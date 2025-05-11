import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        selectedKuchu: {
          title: String,
          img: String,
          price: Number,
        },
      },
    ],
    total: Number,
    status: { type: String, default: "Pending" },
    address: { type: String, required: true }, 
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
