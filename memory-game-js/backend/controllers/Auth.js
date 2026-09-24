import express from "express";
import Auth from "../models/auth.js";

export async function register(req, res) {
  try {
    let { name, email } = req.body;
    if (name.length === 0 || email.length === 0) {
      return res.status(400).json({ message: "Fill all fields" });
    }
    name = name.trim();
    email = email.trim();

    const emailExists = await Auth.findOne({ email });
    if (emailExists)
      return res
        .status(200)
        .json({ userStatus: "old", message: "User exists" });
    else {
      const newUser = new Auth({ name, email });
      await newUser.save();
      return res
        .status(201)
        .json({ userStatus: "new", message: "New user registered" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
