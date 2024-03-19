const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const register = async (req, res) => {
    const {username, email, password, phone} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashPassword, email, phone});
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created'
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        })
    }
}
const login = async (req, res) => {
    const { username, password } = req.body;
    try{
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }
        const token = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        return res.status(200).json({
            success: true,
            message: 'Login success',
            token
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        })
    }
}
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        const token = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 900000;
        user.passwordResetVerified = false;
        await user.save();
        //send email
        return res.status(200).json({
            success: true,
            message: 'Check your email'
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        })
    }
}
const verifyResetPassword = async (req, res) => {
    const token = jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}});
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    user.passwordResetVerified = true;
    await user.save();
    return res.status(200).json({
        success: true,
        message: 'Password reset verified'
    })
}
const resetPassword = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    if(!user.passwordResetVerified){
        return res.status(400).json({
            success: false,
            message: 'Password reset not verified'
        })
    }
    user.password = await bcrypt.hash(req.body.password, 10);
    user.passwordResetVerified = undefined
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save();
    return res.status(200).json({
        success: true,
        message: 'Password reset success'
    })
}
module.exports = {register, login, forgotPassword, resetPassword}
