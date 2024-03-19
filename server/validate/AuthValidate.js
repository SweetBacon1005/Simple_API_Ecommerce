const slugify = require("slugify");
const { check } = require("express-validator");
const validateHandler = require("../middlewares/ValidateHandler");
const User = require("../models/User");

const registerValidate = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirm is not match");
      }
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  validateHandler,
];

const loginValidate = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (!user) {
        throw new Error("Username not found");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validateHandler,
];
module.exports = { registerValidate, loginValidate };
