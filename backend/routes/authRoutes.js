import express from "express";
import db from "../db.js"; // adjust path if needed

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look up user by email or username
    const [rows] = await db.query(
      `SELECT userID, username, email, password, userType 
       FROM users 
       WHERE email = ? OR username = ? 
       LIMIT 1`,
      [email, email]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    // Plain text comparison (⚠️ only for testing!)
    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }
    if (
      user.userType === "organization" &&
      user.verificationStatus !== "verified"
    ) {
      return res
        .status(403)
        .json({
          message: "Your organization account is pending admin approval.",
        });
    }

    // Success: return minimal user info (not password)
    res.json({
      success: true,
      user: {
        userID: user.userID,
        username: user.username,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
