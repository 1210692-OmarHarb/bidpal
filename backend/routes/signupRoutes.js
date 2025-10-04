import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import pool from "../db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.log("Email transporter error:", err);
  else console.log("✅ Email transporter ready");
});

router.post(
  "/signup",
  // Validation middleware
  [
    body("userType")
      .isIn(["user", "organization"])
      .withMessage("Invalid user type"),
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    // Personal fields
    body("firstName")
      .if(body("userType").equals("user"))
      .trim()
      .notEmpty()
      .withMessage("First name required"),
    body("lastName")
      .if(body("userType").equals("user"))
      .trim()
      .notEmpty()
      .withMessage("Last name required"),
    // Org fields
    body("organizationName")
      .if(body("userType").equals("organization"))
      .trim()
      .notEmpty()
      .withMessage("Organization name required"),
    body("organizationContactEmail")
      .if(body("userType").equals("organization"))
      .isEmail()
      .withMessage("Valid organization email required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      userType,
      firstName,
      lastName,
      username,
      email,
      password,
      organizationName,
      organizationContactEmail,
    } = req.body;

    try {
      const [existing] = await pool.query(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username]
      );

      if (existing.length > 0)
        return res
          .status(400)
          .json({ message: "Email or username already in use" });

      const [result] = await pool.query(
        `INSERT INTO users 
   (firstName, lastName, username, email, password, userType, organizationID, organizationContactEmail)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userType === "user" ? firstName : null,
          userType === "user" ? lastName : null,
          username,
          email,
          password,
          userType,
          userType === "organization" ? organizationName : null,
          userType === "organization" ? organizationContactEmail : null,
          userType === "organization" ? "pending" : "verified",
        ]
      );

      // Email
      const mailOptions = {
        from: "BidPal Team",
        to: email,
        subject: "BidPal - Verify your account",
        text: `Hello ${
          userType === "user" ? firstName : organizationName
        },\n\nThank you for signing up! Verify your account by clicking this link: http://localhost:5000/verify/${
          result.insertId
        }\n\n${
          userType === "organization"
            ? "Your organization account is pending admin approval."
            : ""
        }\n\nBidPal Team`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) console.error("Email sending error:", err);
      });

      return res.status(201).json({
        message:
          userType === "organization"
            ? "Registration successful! Check your email. Organization account is pending admin approval."
            : "Registration successful! Check your email to verify your account.",
      });
    } catch (err) {
      console.error("Signup error:", err);
      return res
        .status(500)
        .json({ message: "Server error. Please try again." });
    }
  }
);

router.get("/verify/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Mark email as verified
    const [result] = await pool.query(
      "UPDATE users SET emailVerified = 1 WHERE userID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Invalid verification link" });
    }

    // 2️⃣ Get user info
    const [users] = await pool.query("SELECT * FROM users WHERE userID = ?", [
      id,
    ]);
    const user = users[0];

    // 3️⃣ If organization, notify admins
    if (
      user.userType === "organization" &&
      user.verificationStatus === "pending"
    ) {
      const [admins] = await pool.query(
        "SELECT email FROM users WHERE userType = 'admin'"
      );

      admins.forEach(async (admin) => {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: admin.email,
          subject: "New Organization Awaiting Approval",
          html: `<p>The organization <strong>${user.organizationID}</strong> has verified their email and is awaiting admin approval.</p>`,
        });
      });

      return res.json({
        message:
          "Email verified successfully! Your organization account is pending admin approval.",
        isOrganization: true,
      });
    }

    // 4️⃣ Normal users
    res.json({
      message: "Email verified successfully!",
      isOrganization: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
