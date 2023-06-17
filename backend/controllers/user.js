const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const createDOMPurify = require('dompurify');
const mongoose = require('mongoose');
const he = require('he');

// OTP configuration
const OTP_LENGTH = 6;
const OTP_EXPIRY = 15; // OTP expiry time in minutes

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  // Email service configuration
    service: 'gmail',
    auth: {
      user: "venthere49@gmail.com",
      pass: process.env.MAILER_PASSWORD,
    },
    
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please enter all fields!')
    }

    // Generate OTP
    const otp = otpGenerator.generate(OTP_LENGTH, { upperCase: false, specialChars: false });
  
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
      otp: {
        code: otp,
        expiresAt: Date.now() + OTP_EXPIRY * 60 * 1000,
      },
      verified: false,
    })
  
    if (user) {
        // Send verification email with OTP
        const mailOptions = {
          from: '<no-reply@venthere49.com>',
          to: user.email,
          subject: 'Email Verification',
          html: `<p>Hi ${user.name},</p>
                <p>Please click the following link to verify your email:</p>
                <a href="${req.protocol}://${req.get('host')}/api/user/verify-email/${user._id}/${otp}">Verify Email</a>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(400).json({ message: `Error sending verification email: ${error}` });
          } else {
            return res.status(201).json({userId: user._id, otp:otp, message: 'Registration successful. Verification email sent.' });
          }
        });
        

    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  });

const verifyEmail = asyncHandler(async (req,res) =>{
  const userId = req.params.id;
  const otp = req.params.otp;
  // Find user record by ID
  const user = await User.findById(userId);
  // Verify OTP and check expiration
  if (user){
    if (user && user.otp.code === otp && user.otp.expiresAt > Date.now()) {
      user.verified = true;
      user.otp = null; // Clear OTP after verification
      await user.save();

      return res.status(201).json({
          _id: user.id,
          name: he.encode(user.name),
          email: he.encode(user.email),
          verified: user.verified,
          token: generateToken(user._id),
        })
    } else {
      return res.status(400).json({ message: 'Invalid verification link.'});
    }
  }
  else{
    return res.status(404).json({message:"User not found!"});
  }
  
});

const verifyOTP = asyncHandler(async (req,res) =>{
  const userId = req.params.id;
  const otp = req.params.otp;
  // Find user record by ID
  const user = await User.findById(userId);
  if (user && user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(401).json({ message: 'Account locked. Please try again later.' });
  }

  if(!user){
    return res.status(404).json({message:"User not found! Please try again."});

  }
  // Verify OTP and check expiration
  if(user.otp.code !== otp || user.otp.expiresAt <= Date.now()){
    user.loginAttempts += 1;
      if (user.loginAttempts >= 3) {
        // Lock the account for a specific duration (e.g., 1 hour)
        user.lockUntil = Date.now() + 60 * 5 * 1000;
      }
      user.save();
      return res.status(400).json({ message: 'Invalid OTP!'});
  }

  user.loginAttempts = 0;
  user.lockUntil = undefined;
  user.otp = null; // Clear OTP after verification
  await user.save();
  return res.status(201).json({
      _id: user.id,
      name: he.encode(user.name),
      email: he.encode(user.email),
      otp:otp,
      token: generateToken(user._id),
    });
  
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check for user email
    const user = await User.findOne({ email });
    if (user && user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(401).json({ message: 'Account locked. Please try again later.' });
    }

    if(!user){
      return res.status(404).json({message:"User not found! Please try again."});

    }
    if ((!await bcrypt.compare(password, user.password))){
      user.loginAttempts += 1;
      if (user.loginAttempts >= 3) {
        // Lock the account for a specific duration (e.g., 1 hour)
        user.lockUntil = Date.now() + 60 * 5 * 1000;
      }
      user.save();
      return res.status(400).json({message: "Invalid credentials!"});
    }
    // Generate OTP
    const otp = otpGenerator.generate(OTP_LENGTH, { upperCase: false, specialChars: false });
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    // Send verification email with OTP
    user.otp = {
                code: otp,
                expiresAt: Date.now() + OTP_EXPIRY * 60 * 1000
              };
    await user.save();
    const mailOptions = {
      from: '<no-reply@venthere49.com>',
      to: user.email,
      subject: 'Account verification',
      html: `<p>Hi ${user.name},</p>
            <p>Please enter the following code to verify your account:</p>
            <p>${otp}</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ message: `Error sending verification email: ${error}` });
      } else {
        return res.status(201).json({ userId: user._id, otp:otp, message: 'Login successful. Verification email sent.' });

      }
    });
    
});

const forgotPassword = asyncHandler(async (req,res)=>{
      const { email } = req.body;
      // Find user record by email
      const user = await User.findOne({ email });
      if (!user){
        return res.status(404).json({message:"User not found! Please try again."});
      }

      if (user && user.lockUntil && user.lockUntil > Date.now()) {
        return res.status(401).json({ message: 'Account locked. Please try again later.' });
      }
      // Generate OTP
      const otp = otpGenerator.generate(OTP_LENGTH, { upperCase: false, specialChars: false });
      if(user){
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.otp = {
          code: otp,
          expiresAt: Date.now() + OTP_EXPIRY * 60 * 1000,
        };
        await user.save();
  
        // Send password reset email with OTP
        const mailOptions = {
          from: '<no-reply@venthere49.com>',
          to: user.email,
          subject: 'Password Reset',
          html: `<p>Hi ${user.name},</p>
                <p>Please use the following link to reset your password:</p>
                <a href="${req.protocol}://${req.get('host')}/api/user/verify-otp/${user._id}/${otp}">Verify Account</a>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(400).json({ message: `Error sending verification email: ${error}` });
          } else {
            return res.status(201).json({ userId: user._id, otp:otp, message: 'Verification email sent.' });
        };
      });
    }
    else{
      return res.status(404).json({message:"User not found! Please try again."});
    }
      
})

const resetPassword = asyncHandler(async (req,res)=>{
  const userId = req.params.id;
  const {newPassword } = req.body;

  // Find user record by email
  const user = await User.findById(userId);
  if (!user){
    return res.status(404).json({message: "User not found!"});
  }

  if (user && user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(401).json({ message: 'Account locked. Please try again later.' });
  }

  if(user){
      // Update user's password
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      user.password = hashedPassword;
      await user.save();
  
      // Send response to client
      return res.status(200).json({ password:user.password,message: 'Password reset successful.' });
  }
  else{
    return res.status(404).json({message:"User not found!  Please try again."});
  }
  
});

const changePassword = asyncHandler(async(req,res)=>{
  const userId = req.params.id;
  const {password,newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user){
    return res.status(404).json({message:"User not found!"});
  }

  if (user && user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(401).json({ message: 'Account locked. Please try again later.' });
  }
  
  if((user && !(await bcrypt.compare(password, user.password)) || (user && await bcrypt.compare(newPassword, user.password))) ){
    user.loginAttempts += 1;
      if (user.loginAttempts >= 3) {
        // Lock the account for a specific duration (e.g., 1 hour)
        user.lockUntil = Date.now() + 60 * 5 * 1000;
      }
      user.save();
      return res.status(400).json({message: "Password update failed! Please try again!"});
  }

  if (user){
      // Update user's password
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      user.password = hashedPassword;
      await user.save();
  
      // Send response to client
      return res.status(200).json({ message: 'Password reset successful.' });
  }
  else{
    return res.status(404).json({message:"User not found!"});
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
    register,
    login,
    getUsers,
    changeStatus,
    verifyEmail,
    verifyOTP,
    forgotPassword,
    changePassword,
    resetPassword
    }

