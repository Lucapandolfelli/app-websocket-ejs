import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Product", ProductSchema);
