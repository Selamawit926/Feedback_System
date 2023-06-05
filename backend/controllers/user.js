const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// OTP configuration
const OTP_LENGTH = 6;
const OTP_EXPIRY = 5; // OTP expiry time in minutes

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please enter all fields!')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists!')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    if (user) {
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  });

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check for user email
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  });

const getUsers = asyncHandler(async (req,res)=>{

    const users = await User.find();
    if (users){
        return res.status(200).json({
            users: users
        });
    }
    else{
        res.status(400);
        throw new Error('Error fetching users');
    }
});

const changeStatus = asyncHandler(async (req,res)=>{
    const userId = req.params.id;
    const status = req.body.status;

    const updatedUser = await User.updateOne(
      {
        id: userId
      },
      {
        active: status
      }
    );

    if(updatedUser){
      return res.status(200).json({
        user: updatedUser
    });
    }
    else{
      res.status(400);
      throw new Error('Error updating user');
    }
});


  // Generate JWT
const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    };



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    changeStatus
    }

