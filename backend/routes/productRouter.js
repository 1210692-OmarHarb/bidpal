import express from "express";
import db from "../db.js";

const router = express.Router();

/**
 * 🔹 Test endpoint
 */
router.get("/test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM auction LIMIT 1");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🔹 GET single auction/product by ID
 */
router.get("/:auctionID", async (req, res) => {
  const { auctionID } = req.params;

  try {
    console.log("Fetching auction:", auctionID);

    // 1. Get main auction data
    const [auctionRows] = await db.query(
      `SELECT 
        a.auctionID,
        a.title,
        a.description,
        a.startingPrice,
        a.status,
        a.startDate,
        a.endDate,
        a.currentHighestBid,
        a.shippingOption,
        a.shippingCost,
        a.returnPolicy,
        a.warrantyInfo,
        a.itemCondition,
        i.name AS itemName,
        i.images,
        c.name AS categoryName,
        u.userID,
        u.username
      FROM auction a
      JOIN item i ON a.itemID = i.itemID
      JOIN category c ON i.categoryID = c.categoryID
      JOIN users u ON a.userID = u.userID
      WHERE a.auctionID = ?`,
      [auctionID]
    );

    console.log("Query result:", auctionRows.length, "rows");

    if (auctionRows.length === 0) {
      return res.status(404).json({ error: "Auction not found" });
    }

    const auction = auctionRows[0];

    // 2. Get extra fields (specifications)
    const [extraFields] = await db.query(
      `SELECT fieldName, fieldValue
       FROM auctionextrafields
       WHERE auctionID = ?`,
      [auctionID]
    );

    // 3. Get bid history
    const [bidHistory] = await db.query(
      `SELECT 
        b.bidAmount,
        b.bidTime,
        u.username
      FROM bids b
      JOIN users u ON b.userID = u.userID
      WHERE b.auctionID = ?
      ORDER BY b.bidTime DESC
      LIMIT 10`,
      [auctionID]
    );

    // 4. Get total bids count
    const [bidCount] = await db.query(
      `SELECT COUNT(*) AS totalBids
       FROM bids
       WHERE auctionID = ?`,
      [auctionID]
    );

    // 5. Get related auctions (same category)
    const [relatedAuctions] = await db.query(
      `SELECT 
        a.auctionID,
        a.title,
        a.currentHighestBid,
        a.startingPrice,
        a.endDate,
        i.images
      FROM auction a
      JOIN item i ON a.itemID = i.itemID
      WHERE i.categoryID = (
        SELECT categoryID FROM item WHERE itemID = (
          SELECT itemID FROM auction WHERE auctionID = ?
        )
      )
      AND a.auctionID != ?
      AND a.status IN ('live', 'ending_soon')
      LIMIT 4`,
      [auctionID, auctionID]
    );

    // 6. Calculate time left (handle NULL endDate)
    let hours = 0,
      minutes = 0,
      seconds = 0;

    if (auction.endDate) {
      const now = new Date();
      const endDate = new Date(auction.endDate);
      const timeLeftMs = endDate - now;

      hours = Math.max(0, Math.floor(timeLeftMs / (1000 * 60 * 60)));
      minutes = Math.max(
        0,
        Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60))
      );
      seconds = Math.max(0, Math.floor((timeLeftMs % (1000 * 60)) / 1000));
    }

    // 7. Format bid history
    const now = new Date();
    const formattedBidHistory = bidHistory.map((bid) => {
      const bidTime = new Date(bid.bidTime);
      const timeDiff = now - bidTime;
      const minutesAgo = Math.floor(timeDiff / (1000 * 60));

      let timeAgo;
      if (minutesAgo < 1) timeAgo = "Just now";
      else if (minutesAgo < 60)
        timeAgo = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
      else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        timeAgo = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
      }

      // Mask username
      const username = bid.username;
      const maskedUsername = `${username.substring(
        0,
        4
      )}***${username.substring(username.length - 2)}`;

      return {
        bidder: maskedUsername,
        amount: parseFloat(bid.bidAmount),
        time: timeAgo,
      };
    });

    // 8. Format related auctions
    const formattedRelated = relatedAuctions.map((rel) => {
      const relEndDate = new Date(rel.endDate);
      const relTimeLeft = relEndDate - now;

      const days = Math.floor(relTimeLeft / (1000 * 60 * 60 * 24));
      const hrs = Math.floor(
        (relTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((relTimeLeft % (1000 * 60 * 60)) / (1000 * 60));

      let timeDisplay;
      if (days > 0) timeDisplay = `${days}d ${hrs}h`;
      else if (hrs > 0) timeDisplay = `${hrs}h ${mins}m`;
      else timeDisplay = `${mins}m`;

      const images = rel.images ? JSON.parse(rel.images) : [];

      return {
        auctionID: rel.auctionID,
        title: rel.title,
        price: `$${parseFloat(
          rel.currentHighestBid || rel.startingPrice || 0
        ).toFixed(0)}`,
        time: timeDisplay,
        img: images[0] || "/img/placeholder.png",
      };
    });

    // 9. Format specifications
    const specifications = {};
    extraFields.forEach((field) => {
      specifications[field.fieldName] = field.fieldValue;
    });

    // 10. Build response
    const response = {
      title: auction.title,
      images: auction.images ? JSON.parse(auction.images) : [],
      currentBid: parseFloat(
        auction.currentHighestBid || auction.startingPrice
      ),
      startingPrice: parseFloat(auction.startingPrice),
      bidIncrement: 5.0,
      totalBids: bidCount[0].totalBids,
      watchers: 0,
      condition: auction.itemCondition,
      status: auction.status || "upcoming",
      seller: {
        userID: auction.userID,
        name: auction.username,
        rating: 0,
        reviews: 0,
        memberSince: 2024,
      },
      description: auction.description || "",
      specifications: specifications,
      category: auction.categoryName,
      shipping: {
        option: auction.shippingOption,
        cost: parseFloat(auction.shippingCost || 0),
      },
      returnPolicy: auction.returnPolicy,
      warranty: auction.warrantyInfo,
      timeLeft: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
      bidHistory: formattedBidHistory,
      relatedAuctions: formattedRelated,
    };

    console.log("Success! Sending response");
    res.json({ success: true, data: response });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      error: "Failed to fetch product details",
      details: err.message,
    });
  }
});

/**
 * 🔹 POST - Place a bid
 */
router.post("/:auctionID/bid", async (req, res) => {
  const { auctionID } = req.params;
  const { userID, bidAmount } = req.body;

  try {
    // 1. Get auction details
    const [auctionRows] = await db.query(
      `SELECT currentHighestBid, startingPrice, status, endDate
       FROM auction
       WHERE auctionID = ?`,
      [auctionID]
    );

    if (auctionRows.length === 0) {
      return res.status(404).json({ error: "Auction not found" });
    }

    const auction = auctionRows[0];
    const currentBid = parseFloat(
      auction.currentHighestBid || auction.startingPrice
    );
    const minBid = currentBid + 5.0;

    // 2. Validate bid
    if (auction.status !== "live" && auction.status !== "ending_soon") {
      return res.status(400).json({ error: "Auction is not accepting bids" });
    }

    if (new Date() > new Date(auction.endDate)) {
      return res.status(400).json({ error: "Auction has ended" });
    }

    if (parseFloat(bidAmount) < minBid) {
      return res.status(400).json({
        error: `Minimum bid is $${minBid.toFixed(2)}`,
      });
    }

    // 3. Mark previous highest bid as outbid
    await db.query(
      `UPDATE bids
       SET status = 'outbid'
       WHERE auctionID = ? AND status = 'active'`,
      [auctionID]
    );

    // 4. Insert new bid
    await db.query(
      `INSERT INTO bids (auctionID, userID, bidAmount, status)
       VALUES (?, ?, ?, 'active')`,
      [auctionID, userID, bidAmount]
    );

    // 5. Update auction's current highest bid
    await db.query(
      `UPDATE auction
       SET currentHighestBid = ?
       WHERE auctionID = ?`,
      [bidAmount, auctionID]
    );

    res.json({
      success: true,
      message: "Bid placed successfully",
      newBid: parseFloat(bidAmount),
    });
  } catch (err) {
    console.error("Error placing bid:", err);
    res.status(500).json({ error: "Failed to place bid" });
  }
});

// Manual endpoint to end auctions (for testing)
router.post("/end-auctions", async (req, res) => {
  try {
    const now = new Date();

    const [endedAuctions] = await db.query(
      `SELECT auctionID 
       FROM auction 
       WHERE endDate <= ? 
       AND status IN ('live', 'ending_soon')`,
      [now]
    );

    for (const auction of endedAuctions) {
      await db.query(
        `UPDATE auction SET status = 'ended' WHERE auctionID = ?`,
        [auction.auctionID]
      );

      await db.query(
        `UPDATE bids SET status = 'winner' 
         WHERE auctionID = ? AND status = 'active'`,
        [auction.auctionID]
      );
    }

    res.json({
      success: true,
      message: `${endedAuctions.length} auctions ended`,
      auctionIDs: endedAuctions.map((a) => a.auctionID),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
