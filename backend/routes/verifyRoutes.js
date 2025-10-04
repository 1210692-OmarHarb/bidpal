// verifyRoutes.js
import express from "express";
import pool from "../db.js"; // your DB connection

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // update emailVerified to 1
    const [result] = await pool.query(
      "UPDATE users SET emailVerified = 1 WHERE userID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Invalid verification link.");
    }

    // redirect to frontend login page after verification
    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

export default router;
