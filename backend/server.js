import express from "express";
import cors from "cors";
import db from "./db.js"; // ADD THIS - Import database
import auctionsRoutes from "./routes/auctionsRoutes.js";
import homepageRoutes from "./routes/homeRoutes.js";
import productRouter from "./routes/productRouter.js";
import "./routes/cronJobs.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Make db available to all routes - ADD THIS
app.set("db", db);

// Routes
app.use("/api/auctions", auctionsRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/product", productRouter);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
