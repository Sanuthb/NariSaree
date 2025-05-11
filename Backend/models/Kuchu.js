import mongoose from "mongoose";

const KuchuSchema = new mongoose.Schema({
  title: String,
  img: String,
  price: Number
}, { timestamps: true });

const Kuchu = mongoose.model('kuchu', KuchuSchema);

export default Kuchu
