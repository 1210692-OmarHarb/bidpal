import cron from "node-cron";
import db from "../db.js";

// Run every minute to check for ended auctions
cron.schedule("* * * * *", async () => {
  console.log("Checking for ended auctions...");

  try {
    const now = new Date();

    // 1. Find auctions that have ended but status is still 'live' or 'ending_soon'
    const [endedAuctions] = await db.query(
      `SELECT auctionID 
       FROM auction 
       WHERE endDate <= ? 
       AND status IN ('live', 'ending_soon')`,
      [now]
    );

    for (const auction of endedAuctions) {
      // 2. Update auction status to 'ended'
      await db.query(
        `UPDATE auction 
         SET status = 'ended' 
         WHERE auctionID = ?`,
        [auction.auctionID]
      );

      // 3. Mark the highest bid as 'winner'
      await db.query(
        `UPDATE bids 
         SET status = 'winner' 
         WHERE auctionID = ? 
         AND status = 'active'`,
        [auction.auctionID]
      );

      console.log(`Auction ${auction.auctionID} ended. Winner updated.`);
    }

    // 4. Update auction status based on time (upcoming -> live -> ending_soon)
    // Set to 'live' if startDate passed and endDate hasn't
    await db.query(
      `UPDATE auction 
       SET status = 'live' 
       WHERE startDate <= ? 
       AND endDate > ? 
       AND status = 'upcoming'`,
      [now, now]
    );

    // Set to 'ending_soon' if less than 3 days left
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    await db.query(
      `UPDATE auction 
       SET status = 'ending_soon' 
       WHERE endDate <= ? 
       AND endDate > ? 
       AND status = 'live'`,
      [threeDaysFromNow, now]
    );
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

console.log("Cron job started - checking auctions every minute");
