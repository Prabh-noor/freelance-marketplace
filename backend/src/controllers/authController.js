const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.login = async (req, res) => {
    try {
        console.log("Req received", req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Incomplete information!" })
        }
        // add this log in every request
        console.log("Mongoose Connection State:", mongoose.connection.readyState);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password!' });
        }
        console.log("user:", user)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password!' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        if(!email || !password || !role){
            return res.status(400).json({ message: "Incomplete information" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        const validRoles = User.schema.path("role").enumValues;
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role!" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered! Try logging in." });
        }
        const newUser = new User({ name, email, password: hashedPass, role });
        console.log("NewUser", newUser);
        await newUser.save();
        res.json({ message: "User saved successfully" })
    } catch (error) {
        if (error.code === 11000) { // handle race conditions
            return res.status(400).json({ message: "Email already registered! Please log in." });
        }
        console.log(error)
        res.status(500).json({ error });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.userId).select('-password');
        if(!user) return res.status(400).json({ error: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.updatedAt = new Date();
        await user.save();
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        if (error.code === 11000) { // handle race conditions
            return res.status(400).json({ message: "Email already registered! Please log in." });
        }
        console.log(error)
        res.status(500).json({ error });
    }
}
