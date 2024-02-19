const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class AuthController {
    async register(req, res) {
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            })
        }
        try{
            const user = await User.findOne({username});
            if(user){
                return res.status(400).json({
                    success: false,
                    message: 'Username already exists'
                })
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({username, password: hashPassword});
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
    async login(req, res) {
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            })
        }
        try{
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: 'Username not found'
                })
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({
                    success: false,
                    message: 'Invalid password'
                })
            }
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
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
}
module.exports = new AuthController();
