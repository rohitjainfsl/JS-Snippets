import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}
