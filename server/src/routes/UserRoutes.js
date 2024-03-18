const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();


router.post('/signup', async (req, res) => {
    const {username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username ,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log("Usuário registrado com sucesso!");
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User is not registered" });
        }
       
    const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({message: "password is incorrect"})
        }
    
    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '3h' });
    
    res.cookie('token', token, { maxAge: 360000 });
    return res.json({statuus: true, message: "login sucessflly"})
})

module.exports = router;
