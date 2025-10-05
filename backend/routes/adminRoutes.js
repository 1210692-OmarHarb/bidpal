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

// GET pending orgs
router.get("/pending-organizations", async (req, res) => {
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
router.post("/approve-organization/:userID", async (req, res) => {
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

    // Check if notifications table exists before inserting
    try {
      await pool.query(
        `INSERT INTO notifications (userID, type, title, message, priority) 
         VALUES (?, 'account_verified', 'Organization Approved', 'Your organization account has been approved.', 'high')`,
        [userID]
      );
    } catch (notifErr) {
      console.log(
        "Notification insert failed (table may not exist):",
        notifErr.message
      );
    }

    // Send approval email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: org.organizationContactEmail,
        subject: "Organization Approved - BidPal",
        html: `
          <h2>Congratulations!</h2>
          <p>Your organization <strong>${org.organizationID}</strong> has been approved.</p>
          <p>You can now log in to your account and start using BidPal.</p>
          <p>Thank you for joining us!</p>
          <br>
          <p>Best regards,<br>BidPal Team</p>
        `,
      });
    } catch (emailErr) {
      console.log("Email send failed:", emailErr.message);
    }

    res.json({
      message: "Organization approved successfully",
      organizationID: org.organizationID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve organization" });
  }
});

// Reject org
router.post("/reject-organization/:userID", async (req, res) => {
  const { userID } = req.params;
  const { rejectionReason } = req.body;

  if (!rejectionReason)
    return res.status(400).json({ message: "Rejection reason is required" });

  try {
    const [orgs] = await pool.query(
      "SELECT username, email, organizationID, organizationContactEmail FROM users WHERE userID = ? AND userType = 'organization'",
      [userID]
    );

    if (!orgs.length)
      return res.status(404).json({ message: "Organization not found" });

    const org = orgs[0];

    await pool.query(
      "UPDATE users SET verificationStatus = 'rejected', accountStatus = 'suspended', suspensionReason = ? WHERE userID = ?",
      [rejectionReason, userID]
    );

    // Check if notifications table exists before inserting
    try {
      await pool.query(
        `INSERT INTO notifications (userID, type, title, message, priority) 
         VALUES (?, 'account_suspended', 'Organization Rejected', ?, 'high')`,
        [
          userID,
          `Your application has been rejected. Reason: ${rejectionReason}`,
        ]
      );
    } catch (notifErr) {
      console.log(
        "Notification insert failed (table may not exist):",
        notifErr.message
      );
    }

    // Send rejection email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: org.email,
        subject: "Organization Application - BidPal",
        html: `
          <h2>Application Update</h2>
          <p>Thank you for your interest in BidPal.</p>
          <p>Unfortunately, your organization application for <strong>${org.organizationID}</strong> has not been approved at this time.</p>
          <p><strong>Reason:</strong> ${rejectionReason}</p>
          <p>If you have questions or would like to appeal this decision, please contact us.</p>
          <br>
          <p>Best regards,<br>BidPal Team</p>
        `,
      });
    } catch (emailErr) {
      console.log("Email send failed:", emailErr.message);
    }

    res.json({ message: "Organization rejected successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject organization" });
  }
});

export default router;
