import mongoose from "mongoose";
require("dotenv").config();

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("connect database successfully");
  } catch (error) {
    console.log("connect database failed");
  }
};

export default connectDB;
