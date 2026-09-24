import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./config/db.js";
import { authRouter } from "./routes/auth.js";

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["http://127.0.0.1:5500", "http://localhost:5173"];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow
    } else {
      callback(new Error("Not allowed by CORS")); // Deny
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

await connectToDB();
app.use("/api/user", authRouter);

app.listen(PORT, () => console.log("Server started at port ", PORT));
