import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  img: String,
  price: Number
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product
