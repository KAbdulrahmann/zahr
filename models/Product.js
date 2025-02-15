import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    rating: Number,
    supply: Number,
    quantity: Number,
    discount: Number,
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
   {timestamps: true}
);


const Product = mongoose.model("Product", ProductSchema);
export default Product;