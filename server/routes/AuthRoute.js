const express = require('express')
const router = express.Router()
const { registerValidate, loginValidate } = require('../validate/AuthValidate')
const { register, login } = require('../controllers/AuthController')
router.post('/register', registerValidate, register)
router.post('/login', loginValidate, login)
module.exports = router