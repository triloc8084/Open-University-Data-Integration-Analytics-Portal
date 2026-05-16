import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// =================== SIGNUP ===================
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, role, state, college } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email: email.toLowerCase(), password: hashedPassword, role: role || "Student", state, college });
    return res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// =================== LOGIN ===================
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase(), role });
    if (!user) return res.status(400).json({ message: "No account found with this email and role" });

    // Backward-compatible: auto-migrate plain-text → bcrypt (Option B)
    const isHash = user.password.startsWith("$2b$") || user.password.startsWith("$2a$");
    let passwordMatch = false;
    if (isHash) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      if (user.password === password) {
        passwordMatch = true;
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }
    if (!passwordMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// =================== FORGOT PASSWORD ===================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) return res.status(404).json({ message: "No account found with this email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
      });
      await transporter.sendMail({
        from: `"OUDIA Portal" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset OTP — OUDIA Portal",
        html: `<div style="font-family:Arial;padding:30px;background:#0A0F1C;color:white;border-radius:12px;max-width:400px">
          <h2 style="color:#60a5fa">Password Reset OTP</h2>
          <h1 style="font-size:48px;letter-spacing:8px;color:#34d399;text-align:center">${otp}</h1>
          <p style="color:#94a3b8">This OTP expires in <strong>5 minutes</strong>.</p>
        </div>`
      });
    }

    const isDev = process.env.NODE_ENV !== "production";
    return res.status(200).json({ message: "OTP sent to your email", ...(isDev && { otp }) });
  } catch (err) {
    return res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// =================== VERIFY OTP ===================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !user.otp) return res.status(400).json({ message: "Invalid request" });
    if (user.otp !== otp) return res.status(400).json({ message: "Incorrect OTP" });
    if (new Date() > user.otpExpiry) return res.status(400).json({ message: "OTP expired. Request a new one." });

    const resetToken = jwt.sign({ email: user.email, purpose: "reset" }, process.env.JWT_SECRET, { expiresIn: "10m" });
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({ message: "OTP verified", resetToken });
  } catch (err) {
    return res.status(500).json({ message: "OTP verification failed" });
  }
});

// =================== RESET PASSWORD ===================
router.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Valid token and password (min 6 chars) required" });
    }
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (decoded.purpose !== "reset") return res.status(400).json({ message: "Invalid reset token" });
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email: decoded.email }, { password: hashed });
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
});

// =================== SETUP ADMIN (allows multiple admins) ===================
router.post("/setup-admin", async (req, res) => {
  try {
    const { email, password, fullName, secretKey } = req.body;
    if (!email || !password || !fullName) return res.status(400).json({ message: "Full name, email and password are required" });
    if (secretKey !== process.env.ADMIN_SETUP_KEY) return res.status(403).json({ message: "Invalid secret key" });
    // Only block if THAT specific email is already registered
    const emailTaken = await User.findOne({ email: email.toLowerCase() });
    if (emailTaken) return res.status(400).json({ message: "This email is already registered" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({ fullName, email: email.toLowerCase(), password: hashed, role: "Admin" });
    return res.status(201).json({ message: "Admin created successfully", email: admin.email });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create admin", error: err.message });
  }
});

// =================== RESET ADMIN PASSWORD ===================
router.post("/reset-admin-password", async (req, res) => {
  try {
    const { email, newPassword, secretKey } = req.body;
    if (secretKey !== process.env.ADMIN_SETUP_KEY) return res.status(403).json({ message: "Invalid secret key" });
    const hashed = await bcrypt.hash(newPassword, 10);
    const admin = await User.findOneAndUpdate({ email: email.toLowerCase(), role: "Admin" }, { password: hashed }, { new: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    return res.status(200).json({ message: "Admin password reset successfully", email: admin.email });
  } catch (err) {
    return res.status(500).json({ message: "Reset failed", error: err.message });
  }
});

export default router;
