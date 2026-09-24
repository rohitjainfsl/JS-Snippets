import { Router } from "express";
import { register } from "../controllers/Auth.js";

export const authRouter = Router();

authRouter.post("/register", register);
