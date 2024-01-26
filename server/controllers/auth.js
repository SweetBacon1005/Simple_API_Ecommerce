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
            )
            return res.status(200).json({
                success: true,
                message: 'User created successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
    
}
module.exports = new AuthController();