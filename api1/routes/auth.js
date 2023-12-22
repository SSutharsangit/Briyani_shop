const express = require("express");
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const saltRounds = 10;

// Function to generate a JWT token
const generateToken = (payload) => {
    const secretKey = 'dfsdfs45fdgdf434'; 
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secretKey, options);
};
route.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username or email already in use" });
        }

        const hashpassword = bcrypt.hashSync(password.toString(), saltRounds);
        const newUser = new User({
            username,
            email,
            password: hashpassword
        });
        const userdoc = await newUser.save();
        const { password: hashedPassword, ...rest } = userdoc._doc;
        res.status(200).json({
            success: true,
            message: rest
        });
    } catch (error) {
        res.status(500).send(error.message || "Internal Server Error");
    }
});

route.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userdoc = await User.findOne({ username: username });

        if (userdoc) {
            const storedHashedPassword = userdoc.password;

            if (bcrypt.compareSync(password.toString(), storedHashedPassword)) {
                const token = generateToken({ username: userdoc.username, userId: userdoc._id });

                // Set the token in a cookie
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 

                const { password: hashedPassword, ...rest } = userdoc._doc;
                res.status(200).json({ rest,success:true });
            } else {
                res.status(401).json({ success: false, message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).send(error.message || "Internal Server Error");
    }
});

module.exports = route;
