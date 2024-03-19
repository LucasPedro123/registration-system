const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer')
const verifyUser = require('../Middleware/VerifyUser');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, 'YHwxIz2HsLCcbRNP', { expiresIn: '3h' });

    res.cookie('token', token, { maxAge: 360000 });
    return res.json({ status: true, message: "Login successfully" });
});

// Enviará E-mail com jwt para poder alterar a senha
router.post('/forgot-pass', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not registered" });
        }

        const token = jwt.sign({ id: user._id },"YHwxIz2HsLCcbRNP", { expiresIn: '5m' });

        console.log(user._id)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lucaspedrofernandes@gmail.com',
                pass: 'nlmk vsov qvrq acvr'
            }
        });

        var mailOptions = {
            from: 'lucaspedrofernandes@gmail.com',
            to: email,
            subject: 'Reset password',
            text: `http://localhost:5173/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ message: "Email sent successfully", id: user._id });
            }
        });
    } catch (e) {
        console.error("Erro no servidor:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});


//Verifica o token e atualiza a senha
router.post('/reset-password', async (req, res) => {
    const { password, token } = req.body;
    try {
        const decoded = jwt.verify(token, "YHwxIz2HsLCcbRNP");
        const userId = decoded.id;

        const hashpassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(userId, { password: hashpassword });
        
        console.log("Success");
        return res.json({ message: "Updated password!" });
    } catch (err) {
        console.error("Error", err);
        return res.json({ message: "Invalid Token." });
    }

});


// Importa o Middleware e, caso ele prosseguir rrtornará true
router.get("/verify", verifyUser, (req, res) => {
    return res.json({status: true, message: "Authorized"})
})


module.exports = router;
