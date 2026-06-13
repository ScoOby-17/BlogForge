const User = require("../models/userModel.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

console.log(process.env.jwtSecret , "this is JWT secret");

exports.register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    //Missing Info
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Fill All information",
      });
    }

    //Alreaddy Exist User
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //user not exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let payload = {
      id: user._id,
      role: user.role,
    };

    let token = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: "2h",
    });

    return res.cookie("token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successfully",
  });
};
