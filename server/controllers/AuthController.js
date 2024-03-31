const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
dotenv.config();
const register = async (req, res) => {
  const { username, password, passwordConfirm, email, phone } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashPassword,
      email,
      phone,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      message: "Login success",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const allowTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this route",
      });
    }
    next();
  });

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 900000;
    user.passwordResetVerified = false;
    await user.save();
    //send email
    return res.status(200).json({
      success: true,
      message: "Check your email",
      email: `http://localhost:8080/auth/reset-password?token=${token}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const resetPassword = async (req, res) => {
  const token = req.query.token;
  const newPassword = await bcrypt.hash(req.body.password, 10);
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findOne({
    _id: decodedToken.id,
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //send email
  return res.status(200).json({
    success: true,
    message: "Password reset success",
  });
};
module.exports = {
  register,
  login,
  allowTo,
  protect,
  forgotPassword,
  resetPassword,
};
