import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 100,
    },
    lastName: {
      type: String,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: Number,
    },
    verificationCode: String,
    verificationCodeExpires: Date,
    city: String,
    state: String,
    country: String,
    occupation: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);



const User = mongoose.model("User", UserSchema);
export default User;