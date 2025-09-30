import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET test route
router.get("/test", (req, res) => {
  res.json({ message: "Auctions route is working!" });
});

// POST create auction
router.post("/create", async (req, res) => {
  let connection;

  try {
    console.log("=== AUCTION CREATION REQUEST ===");
    console.log("Received data:", JSON.stringify(req.body, null, 2));

    const {
      title,
      categoryID,
      description,
      images,
      condition,
      tags,
      reservePrice,
      startingBid,
      startDate,
      endDate,
      autoExtend,
      warranty,
      shippingOption,
      shippingCost,
      returnPolicy,
      sellerID,
      extraFields,
    } = req.body;

    // Validation
    if (!title || !startingBid) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Title and starting bid are required",
      });
    }

    // Get connection and start transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Insert into item table
    console.log("Inserting into item table...");
    const [itemResult] = await connection.query(
      `INSERT INTO item (categoryID, name, images) VALUES (?, ?, ?)`,
      [categoryID || 1, title, JSON.stringify(images || [])]
    );

    const itemID = itemResult.insertId;
    console.log("✅ Item created with ID:", itemID);

    // 2. Insert into auction table
    console.log("Inserting into auction table...");
    const [auctionResult] = await connection.query(
      `INSERT INTO auction (
  userID, itemID, title, description, reservePrice, startingPrice, 
  status, startDate, endDate, autoExtend, currentHighestBid, 
  shippingOption, shippingCost, returnPolicy, warrantyInfo, itemCondition
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`,
      [
        sellerID || 1,
        itemID,
        title,
        description || "",
        reservePrice ? parseFloat(reservePrice) : null,
        parseFloat(startingBid),
        "upcoming",
        startDate,
        endDate,
        autoExtend ? 1 : 0,
        0.0,
        shippingOption || "local",
        shippingCost ? parseFloat(shippingCost) : 0.0,
        returnPolicy || "none",
        warranty || null,
        condition, // <-- added here
      ]
    );

    const auctionID = auctionResult.insertId;
    console.log("✅ Auction created with ID:", auctionID);

    // 3. Insert extra fields
    if (extraFields && extraFields.length > 0) {
      console.log("Inserting extra fields...");
      for (const field of extraFields) {
        if (field.name && field.description) {
          await connection.query(
            `INSERT INTO auctionextrafields (auctionID, fieldName, fieldValue) VALUES (?, ?, ?)`,
            [auctionID, field.name, field.description]
          );
        }
      }
      console.log("✅ Extra fields inserted");
    }

    await connection.commit();
    console.log("✅ SUCCESS!");

    res.json({
      success: true,
      auctionID,
      itemID,
      message: "Auction created successfully",
    });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }

    console.error("ERROR:", err.message);
    res.status(500).json({
      error: "Failed to create auction",
      details: err.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

export default router;
