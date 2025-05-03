const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Register User
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // console.log("Register Request received:", req.body);
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User already registered ', error: error.message });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // console.log("Token generated:", token);
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
        // console.log("Get profile Request received:", user);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { register, login, getProfile };