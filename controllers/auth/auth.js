

import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
    auth: {
        user: 'zahrstore01@gmail.com',
        pass: 'mfxcbekmezkprzxr',
    },
});

// ✅ Send verification code to user's email
export const sendCode = async (req, res) => {
    try {
        console.log(req.body)
        const { email } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email });
        }

        const code = Math.floor(1000 + Math.random() * 9999); // Generate 6-digit code
        user.verificationCode = code;
        user.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 mins

        console.log(user)
        await user.save();

        // Send email
        await transporter.sendMail({
            from: 'زهر',
            to: email,
            subject: "رمز التحقق ياكبير",
            text: `الكود اهو: ${code}. هيخلص بعد ٥ دقايق الحق.`,
        });

        res.status(200).json({ message: "Code sent to email" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ Verify the code and log in the user
export const verifyCode = async (req, res) => {
    try {

        console.log(req.body)
        const { email, code } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.verificationCode !== code || user.verificationCodeExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired code" });
        }
        console.log(user)

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Clear the verification code
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();

        res.status(200).json({ message: "Login successful", token,isRegistered:user.phone!=null,user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, email } = req.body;

        // Find user by email
        let user = await User.findOne({ email });

        if (user) {
            // If user exists, update the details
            user.firstName = firstName;
            user.lastName = lastName;
            user.phone = phone;
            await user.save();
        } else {
            // If new user, create and save
            user = new User({
                firstName,
                lastName,
                phone,
                email,
            });
            await user.save();
        }

        res.status(200).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};