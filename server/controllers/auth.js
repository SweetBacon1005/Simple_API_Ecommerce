require('dotenv').config();
const User = require('../schemas/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {
    async register(req,res) {
        const { username,password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing username and/or password',
            })
        }
        try {
            const user = await User.findOne({username});
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken',
                })
            }
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = new User({username,password: hashPassword});
            await newUser.save();
            const token = jwt.sign(
                {
                    userId: newUser._id,
                    username: newUser.username,
                },
                process.env.ACCESS_TOKEN_SECRET,
            )
            return res.status(200).json({
                success: true,
                message: 'User created successfully',
                token: token,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
    async login(req,res) {
        const { username,password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing username and/or password',
            })
        }
        try {
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                })
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);   
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                })
            }
            const token = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                },
                process.env.ACCESS_TOKEN_SECRET,
            )
            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token: token,
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
}
module.exports = new AuthController();