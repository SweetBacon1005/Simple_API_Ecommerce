const express = require('express');
const router = express.Router();

const User = require('../schema/User');
router.post('/register', async (req,res) => {
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
        const hashPassword = await bcrypt.hash(password);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})