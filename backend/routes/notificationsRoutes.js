import express from "express";
import db from "../db.js";

const router = express.Router();

//  Get unread notifications count for a user
router.get("/unread-count/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS count FROM notifications WHERE userID = ? AND isRead = 0",
      [userId]
    );
    res.json({ count: rows[0].count });
  } catch (err) {
    console.error("Error fetching unread count:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all notifications for a user
router.get("/list/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE userID = ? ORDER BY createdAt DESC",
      [userId]
    );
    res.json({ notifications: rows });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//  Mark all notifications as read for a user
router.post("/mark-read/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await db.query(
      "UPDATE notifications SET isRead = 1, readAt = NOW() WHERE userID = ? AND isRead = 0",
      [userId]
    );
    res.json({ message: "Notifications marked as read" });
  } catch (err) {
    console.error("Error marking as read:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Mark a single notification as read
router.post("/mark-read-single/:notificationId", async (req, res) => {
  const { notificationId } = req.params;

  try {
    const [result] = await db.query(
      "UPDATE notifications SET isRead = 1, readAt = NOW() WHERE notificationID = ?",
      [notificationId]
    );

    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE notificationID = ?",
      [notificationId]
    );

    res.json({ notification: rows[0] });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
