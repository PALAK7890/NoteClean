const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../database_md/db');

require('dotenv').config();
const auth = express.Router();

auth.post('/signin',async(req,res)=>{
    try{
        
        const {username,email,password}=req.body
        

        if (!username || !email || !password){
           return res.status(400).json({message: 'All Fields Are Mandatory'})
        }
        
        const userExists = await User.findOne({email})
        if (userExists){
            return res.status(400).json({message: 'User Already Exists'})
        }
        if (password.length<8){
            return res.status(400).json({message: 'Password must be 8 characters long'})
        }
         if (!/[0-9]/.test(password)){
            return res.status(400).json({message: 'Password must contain 1 number long'})
        }
        if (!/[!@#$%^&*]/.test(password)){
           return res.status(400).json({message: 'Password must contain 1 special Character long'})
            
        }

        const enctPass = await bcrypt.hash(password,10)
        const newUser = new User ({username,email,password:enctPass})
        await newUser.save()
            const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
        return res.status(201).json({ message: "User registered successfully" });

    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Server Error hai',error : err})
    }
})

auth.post ('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        if (!email || !password){
            return res.status(400).json({message :'All fields asre zaruri'})
        }
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const samePass = await bcrypt.compare(password, user.password);
        if (!samePass)
      return res.status(400).json({ message: "Invalid email or password" });
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not set in .env' });
    }
         const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

        
      return res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    username: user.username,
    email: user.email
  }
});

    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Server error", error: err })

    }
})
// ---------------- GOOGLE LOGIN ------------------
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

auth.post("/google-login", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential)
      return res.status(400).json({ message: "No credential provided" });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        password: "google-auth-no-password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ message: "Google Login Failed" });
  }
});

module.exports = auth;