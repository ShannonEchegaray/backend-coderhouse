import mongoose, { Schema } from "mongoose";

export const userSchema = mongoose.model(
  "User",
  new Schema(
    {
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      nickname: { type: String, required: true, unique: true },
      phone_number: { type: String, unique: true },
      profile_image: { type: String, default: "placeholder.jpg" },
      address: { type: String },
      cart: { type: mongoose.Types.ObjectId, ref: "Cart" },
    },
    { timestamps: true }
  )
);

export const productSchema = mongoose.model(
  "Products",
  new Schema(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      category: { type: mongoose.Types.ObjectId, ref: "Category" },
      thumbnail: { type: [String] },
      stock: { type: Number, default: 0 },
      price: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
);

export const categorySchema = mongoose.model(
  "Category",
  new Schema({
    name: { type: String, required: true },
  })
);

const productPurchased = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number },
  price: { type: Number, default: 0 },
});

export const cartSchema = mongoose.model(
  "Cart",
  new Schema(
    {
      user: { type: mongoose.Types.ObjectId, ref: "User" },
      items: { type: [{ type: Schema.Types.ObjectId, ref: "Products" }] },
    },
    { timestamps: true }
  )
);

export const orderSchema = mongoose.model(
  "Order",
  new Schema(
    {
      items: { type: [productPurchased] },
      state: { type: String, default: "generated" },
      email: { type: String },
    },
    { timestamps: true }
  )
);
