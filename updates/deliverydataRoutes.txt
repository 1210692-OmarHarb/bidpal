import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/list-users", async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT *
       FROM users 
       WHERE userType = 'user' 
       AND emailVerified = 1
       ORDER BY joinedDate DESC`
    );

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pending users" });
  }
});

// suspend user
router.post("/suspend-user/:userID", async (req, res) => {
  const { userID } = req.params;
  const { adminNotes } = req.body;

  try {
    const [users] = await pool.query(
      "SELECT username, email, organizationContactEmail FROM users WHERE userID = ? ",
      [userID]
    );

    if (!users.length)
      return res.status(404).json({ message: "User not found" });

    const userUI = users[0];

    await pool.query(
      "UPDATE users SET accountStatus = 'suspended' WHERE userID = ?",
      [userID]
    );

    // Check if notifications table exists before inserting
    try {
      await pool.query(
        `INSERT INTO notifications (userID, type, title, message, priority) 
         VALUES (?, 'account_suspended', 'Account suspended', 'Your  account has been suspended please admins.', 'high')`,
        [userID]
      );
    } catch (notifErr) {
      console.log(
        "Notification insert failed (table may not exist):",
        notifErr.message
      );
    }

    // Send suspend email
    try {
      if (userUI.userType == "user") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: userUI.email,
          subject: "Account Suspended - BidPal",
          html: `
          <h2>Account Suspended!</h2>
          <p>Your Account <strong>${user.username}</strong> has been Suspended.</p>
          <p>You can contact admins.</p>
          <br>
          <p>Best regards,<br>BidPal Team</p>
        `,
        });
      } else {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: userUI.organizationContactEmail,
          subject: "Account Suspended - BidPal",
          html: `
          <h2>Account Suspended!</h2>
          <p>Your Account <strong>${user.username}</strong> has been Suspended.</p>
          <p>You can contact admins.</p>
          <br>
          <p>Best regards,<br>BidPal Team</p>
        `,
        });
      }
    } catch (emailErr) {
      console.log("Email send failed:", emailErr.message);
    }

    res.json({
      message: "Account Suspended successfully",
      userID: userUI.userID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to Suspended Account" });
  }
});

export default router;
