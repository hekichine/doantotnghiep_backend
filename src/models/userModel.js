import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlenght: 6,
      maxlenght: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlenght: 10,
      maxlenght: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 6,
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
