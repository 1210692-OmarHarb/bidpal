import express from "express";
import db from "../db.js";

const router = express.Router();

/**
 * 🔹 1. Categories for search filter
 */
router.get("/categories", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT categoryID, name, description FROM category`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

/**
 * 🔹 2. Status filter options (distinct statuses from auction table)
 */
router.get("/statuses", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT DISTINCT status FROM auction`);
    res.json(rows.map((r) => r.status));
  } catch (err) {
    console.error("Error fetching statuses:", err);
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
});

/**
 * 🔹 3. Hero Carousel (newest auctions, limit 5)
 */
router.get("/carousel", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.auctionID, a.title, a.description, i.images
      FROM auction a
      JOIN item i ON a.itemID = i.itemID
      ORDER BY a.createdAt DESC
      LIMIT 5
    `);

    // Parse images JSON
    const formatted = rows.map((r) => ({
      ...r,
      images: r.images ? JSON.parse(r.images) : [],
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching carousel:", err);
    res.status(500).json({ error: "Failed to fetch carousel" });
  }
});

/**
 * 🔹 4. Featured Auctions (for now: newest 10 auctions, later add "featured" flag)
 */
router.get("/featured", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.auctionID,
        a.title,
        a.startingPrice,
        a.status,
        a.startDate,
        i.images,
        c.name AS categoryName
      FROM auction a
      JOIN item i ON a.itemID = i.itemID
      JOIN category c ON i.categoryID = c.categoryID
      ORDER BY a.createdAt DESC
      LIMIT 10
    `);

    const formatted = rows.map((r) => {
      let imgs = [];
      try {
        imgs = r.images ? JSON.parse(r.images) : [];
      } catch {
        imgs = r.images ? [r.images] : [];
      }

      return {
        ...r,
        images: imgs,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching featured auctions:", err);
    res.status(500).json({ error: "Failed to fetch featured auctions" });
  }
});

/**
 * 🔹 5. Tabbed Auctions (live / upcoming / ending_soon)
 */
router.get("/tabs/:status", async (req, res) => {
  const { status } = req.params;

  try {
    let query;

    if (status === "ending") {
      // Get auctions with 'ending_soon' status
      query = `
        SELECT a.auctionID, a.title, a.currentHighestBid, a.endDate, i.images
        FROM auction a
        JOIN item i ON a.itemID = i.itemID
        WHERE a.status = 'ending_soon'
        ORDER BY a.endDate ASC
        LIMIT 10
      `;
    } else {
      // Get auctions by exact status match
      query = `
        SELECT a.auctionID, a.title, a.startingPrice, a.currentHighestBid, a.startDate, a.endDate, i.images
        FROM auction a
        JOIN item i ON a.itemID = i.itemID
        WHERE a.status = ?
        ORDER BY a.createdAt DESC
        LIMIT 10
      `;
    }

    const [rows] = await db.query(query, status !== "ending" ? [status] : []);

    const formatted = rows.map((r) => ({
      ...r,
      images: r.images ? JSON.parse(r.images) : [],
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching tab auctions:", err);
    res.status(500).json({ error: "Failed to fetch tab auctions" });
  }
});

/**
 * 🔹 6. Get auctions by category
 */
router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;

  try {
    const [results] = await db.query(
      `
      SELECT 
        a.auctionID,
        a.title,
        a.description,
        a.startingPrice,
        a.currentHighestBid,
        a.status,
        a.startDate,
        a.endDate,
        a.itemCondition,
        i.images,
        c.name as categoryName
      FROM auction a
      JOIN item i ON a.itemID = i.itemID
      JOIN category c ON i.categoryID = c.categoryID
      WHERE c.name = ?
      ORDER BY 
        CASE 
          WHEN a.status = 'live' THEN 1
          WHEN a.status = 'ending_soon' THEN 2
          WHEN a.status = 'upcoming' THEN 3
          ELSE 4
        END,
        a.endDate ASC
    `,
      [categoryName]
    );

    const formatted = results.map((auction) => ({
      ...auction,
      images: JSON.parse(auction.images || "[]"),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching category auctions:", err);
    res.status(500).json({ error: "Failed to fetch category auctions" });
  }
});

/**
 * 🔹 7. Search auctions with filters
 */
router.get("/search", async (req, res) => {
  const { q, category, status } = req.query;

  let query = `
    SELECT 
      a.auctionID,
      a.title,
      a.description,
      a.startingPrice,
      a.currentHighestBid,
      a.status,
      a.startDate,
      a.endDate,
      a.itemCondition,
      i.images,
      c.name as categoryName
    FROM auction a
    JOIN item i ON a.itemID = i.itemID
    JOIN category c ON i.categoryID = c.categoryID
    WHERE 1=1
  `;

  const params = [];

  // Add search query filter
  if (q && q.trim()) {
    query += ` AND (a.title LIKE ? OR a.description LIKE ? OR i.name LIKE ?)`;
    const searchTerm = `%${q}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  // Add category filter
  if (category && category.trim()) {
    query += ` AND c.name = ?`;
    params.push(category);
  }

  // Add status filter
  if (status && status.trim()) {
    query += ` AND a.status = ?`;
    params.push(status);
  }

  query += ` ORDER BY 
    CASE 
      WHEN a.status = 'live' THEN 1
      WHEN a.status = 'ending_soon' THEN 2
      WHEN a.status = 'upcoming' THEN 3
      ELSE 4
    END,
    a.endDate ASC
  `;

  try {
    const [results] = await db.query(query, params);

    const formatted = results.map((auction) => ({
      ...auction,
      images: JSON.parse(auction.images || "[]"),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error searching auctions:", err);
    res.status(500).json({ error: "Failed to search auctions" });
  }
});

export default router;
