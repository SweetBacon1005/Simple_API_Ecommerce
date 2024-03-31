const express = require("express");
const router = express.Router();
const { registerValidate, loginValidate } = require("../validate/AuthValidate");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");
router.post("/register", registerValidate, register);
router.post("/login", loginValidate, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
