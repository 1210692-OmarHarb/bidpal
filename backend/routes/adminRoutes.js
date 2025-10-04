import express from "express";
import nodemailer from "nodemailer";
import pool from "../db.js";

const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
transporter.verify((err) => {
  if (err) console.log("Email transporter error:", err);
  else console.log("✅ Email transporter ready");
});

// Middleware: check if admin
const isAdmin = async (req, res, next) => {
  try {
    const userID = req.user?.userID;
    if (!userID) return res.status(401).json({ message: "Unauthorized" });

    const [users] = await pool.query(
      "SELECT userType FROM users WHERE userID = ?",
      [userID]
    );

    if (users.length === 0 || users[0].userType !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication error" });
  }
};

// GET pending orgs
router.get("/pending-organizations", isAdmin, async (req, res) => {
  try {
    const [organizations] = await pool.query(
      `SELECT userID, username, email, organizationID, organizationContactEmail, verificationStatus, joinedDate 
       FROM users 
       WHERE userType = 'organization' 
         AND verificationStatus = 'pending'
       ORDER BY joinedDate DESC`
    );

    res.json({ organizations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pending organizations" });
  }
});

// Approve org
router.post("/approve-organization/:userID", isAdmin, async (req, res) => {
  const { userID } = req.params;
  const { adminNotes } = req.body;

  try {
    const [orgs] = await pool.query(
      "SELECT username, email, organizationID, organizationContactEmail FROM users WHERE userID = ? AND userType = 'organization'",
      [userID]
    );

    if (!orgs.length) return res.status(404).json({ message: "Org not found" });

    const org = orgs[0];

    await pool.query(
      "UPDATE users SET verificationStatus = 'verified', accountStatus = 'active' WHERE userID = ?",
      [userID]
    );

    // Notification in DB
    await pool.query(
      `INSERT INTO notifications (userID, type, title, message, priority) 
       VALUES (?, 'account_verified', 'Organization Approved', 'Your organization account has been approved.', 'high')`,
      [userID]
    );

    // Optional email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: org.email,
      subject: "Organization Approved",
      html: `<p>Your organization <strong>${org.organizationID}</strong> has been approved. You can now log in.</p>`,
    });

    res.json({
      message: "Organization approved",
      organizationID: org.organizationID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve organization" });
  }
});

// Reject org
router.post("/reject-organization/:userID", isAdmin, async (req, res) => {
  const { userID } = req.params;
  const { rejectionReason } = req.body;

  if (!rejectionReason)
    return res.status(400).json({ message: "Reason required" });

  try {
    const [orgs] = await pool.query(
      "SELECT username, email, organizationID, organizationContactEmail FROM users WHERE userID = ? AND userType = 'organization'",
      [userID]
    );

    if (!orgs.length) return res.status(404).json({ message: "Org not found" });

    const org = orgs[0];

    await pool.query(
      "UPDATE users SET verificationStatus = 'rejected', accountStatus = 'suspended', suspensionReason = ? WHERE userID = ?",
      [rejectionReason, userID]
    );

    await pool.query(
      `INSERT INTO notifications (userID, type, title, message, priority) 
       VALUES (?, 'account_suspended', 'Organization Rejected', 'Your application has been rejected. Reason: ${rejectionReason}', 'high')`,
      [userID]
    );

    // Optional email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: org.email,
      subject: "Organization Application Rejected",
      html: `<p>Your organization <strong>${org.organizationID}</strong> has been rejected. Reason: ${rejectionReason}</p>`,
    });

    res.json({ message: "Organization rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject organization" });
  }
});

export default router;
