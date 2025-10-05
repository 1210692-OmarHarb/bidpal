import express from "express";
import { body, validationResult } from "express-validator";
import pool from "../db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Nodemailer transporter for admin notifications
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.log("Email transporter error:", err);
  else console.log("✅ Admin email transporter ready");
});

// Organization signup
router.post(
  "/org-signup",
  [
    body("username").trim().notEmpty().withMessage("Username required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    body("organizationName")
      .notEmpty()
      .withMessage("Organization name required"),
    body("organizationContactEmail")
      .isEmail()
      .withMessage("Valid contact email required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, password, organizationName, organizationContactEmail } =
      req.body;

    try {
      // Check duplicates
      const [existing] = await pool.query(
        "SELECT * FROM users WHERE organizationContactEmail = ? OR username = ?",
        [organizationContactEmail, username]
      );

      if (existing.length > 0)
        return res
          .status(400)
          .json({ message: "Email or username already in use" });

      // Insert organization as pending/suspended
      const [result] = await pool.query(
        `INSERT INTO users 
         (username, password, userType, organizationID, organizationContactEmail, verificationStatus, accountStatus)
         VALUES (?, ?, 'organization', ?, ?, 'pending', 'suspended')`,
        [username, password, organizationName, organizationContactEmail]
      );

      // Notify all admins - FIXED: query for email, not organizationContactEmail
      const [admins] = await pool.query(
        "SELECT organizationContactEmail FROM users WHERE userType = 'admin'"
      );

      if (admins.length > 0) {
        await Promise.all(
          admins.map((admin) =>
            transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: admin.organizationContactEmail, // FIXED: use email instead of organizationContactEmail
              subject: "New Organization Awaiting Approval",
              html: `
                <p>New organization registered:</p>
                <ul>
                  <li><strong>Organization Name:</strong> ${organizationName}</li>
                  <li><strong>Username:</strong> ${username}</li>
                  <li><strong>Contact Email:</strong> ${organizationContactEmail}</li>
                </ul>
                <p>Please review and approve/reject in the admin dashboard.</p>
              `,
            })
          )
        );
      }

      res.status(201).json({
        message:
          "Organization registered successfully! Admin will review and approve your account.",
      });
    } catch (err) {
      console.error("Org signup error:", err);
      res.status(500).json({ message: "Server error. Please try again." });
    }
  }
);

export default router;
