import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Auth = model("auth", authSchema, "auth");
export default Auth;
