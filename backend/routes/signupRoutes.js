import express from "express";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import pool from "../db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Nodemailer transporter for personal user verification
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.log("Email transporter error:", err);
  else console.log("âœ… Personal email transporter ready");
});

// Personal user signup
router.post(
  "/signup",
  [
    body("userType").isIn(["user"]).withMessage("Invalid user type"),
    body("username").trim().notEmpty().withMessage("Username required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    body("firstName").trim().notEmpty().withMessage("First name required"),
    body("lastName").trim().notEmpty().withMessage("Last name required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, username, email, password, userType } =
      req.body;

    try {
      // Check duplicates
      const [existing] = await pool.query(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username]
      );

      if (existing.length > 0)
        return res
          .status(400)
          .json({ message: "Email or username already in use" });

      // Insert personal user
      const [result] = await pool.query(
        `INSERT INTO users 
         (firstName, lastName, username, email, password, userType, verificationStatus, accountStatus)
         VALUES (?, ?, ?, ?, ?, ?, 'pending', 'active')`,
        [firstName, lastName, username, email, password, userType]
      );

      // Send verification email
      const mailOptions = {
        from: "BidPal Team",
        to: email,
        subject: "BidPal - Verify Your Account",
        text: `Hello ${firstName},\n\nThank you for signing up! Verify your account by clicking this link: http://localhost:5000/api/auth/verify/${result.insertId}\n\nBidPal Team`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) console.error("Email sending error:", err);
      });

      res.status(201).json({
        message:
          "Registration successful! Check your email to verify your account.",
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Server error. Please try again." });
    }
  }
);

// Verify personal user email
router.get("/verify/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "UPDATE users SET verificationStatus = 'verified' WHERE userID = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Invalid verification link" });

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
