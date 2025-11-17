import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../Models/User.js";

const router = express.Router();

// Register page

router.post("/signup", async(req,res) =>{
    const {name,email,password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message:"User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User ({name,email,password:hashedPassword});
        await user.save();

        res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        res.status(500).json({message:"Server error"})
    }
})

// login 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;