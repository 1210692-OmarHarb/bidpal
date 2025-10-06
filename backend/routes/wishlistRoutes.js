import express from "express";
import db from "../db.js";

const router = express.Router();

/**
 * Get user's wishlist with auction details
 */
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        w.wishlistID,
        w.auctionID,
        w.addedDate,
        w.notes,
        a.title,
        a.startingPrice,
        a.currentHighestBid,
        a.status,
        a.endDate,
        i.images,
        c.name as categoryName
      FROM wishlist w
      JOIN auction a ON w.auctionID = a.auctionID
      JOIN item i ON a.itemID = i.itemID
      JOIN category c ON i.categoryID = c.categoryID
      WHERE w.userID = ?
      ORDER BY w.addedDate DESC
    `,
      [userID]
    );

    const formatted = rows.map((item) => ({
      ...item,
      images: item.images ? JSON.parse(item.images) : [],
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

/**
 * Add auction to wishlist
 */
router.post("/add", async (req, res) => {
  const { userID, auctionID, notes } = req.body;

  if (!userID || !auctionID) {
    return res.status(400).json({ error: "userID and auctionID are required" });
  }

  try {
    // Check if already in wishlist
    const [existing] = await db.query(
      `SELECT wishlistID FROM wishlist WHERE userID = ? AND auctionID = ?`,
      [userID, auctionID]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Item already in wishlist" });
    }

    // Add to wishlist
    const [result] = await db.query(
      `INSERT INTO wishlist (userID, auctionID, notes) VALUES (?, ?, ?)`,
      [userID, auctionID, notes || null]
    );

    res.json({
      success: true,
      wishlistID: result.insertId,
      message: "Item added to wishlist",
    });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

/**
 * Remove auction from wishlist
 */
router.delete("/remove/:wishlistID", async (req, res) => {
  const { wishlistID } = req.params;

  try {
    const [result] = await db.query(
      `DELETE FROM wishlist WHERE wishlistID = ?`,
      [wishlistID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({
      success: true,
      message: "Item removed from wishlist",
    });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
});

/**
 * Update wishlist item notes
 */
router.put("/update/:wishlistID", async (req, res) => {
  const { wishlistID } = req.params;
  const { notes } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE wishlist SET notes = ? WHERE wishlistID = ?`,
      [notes || null, wishlistID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({
      success: true,
      message: "Wishlist item updated",
    });
  } catch (err) {
    console.error("Error updating wishlist:", err);
    res.status(500).json({ error: "Failed to update wishlist" });
  }
});

export default router;
