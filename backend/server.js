import dotenv from "dotenv";
dotenv.config();
console.log("✅ .env loaded?");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists?", !!process.env.EMAIL_PASS);

import express from "express";
import cors from "cors";
import db from "./db.js";
import auctionsRoutes from "./routes/auctionsRoutes.js";
import homepageRoutes from "./routes/homeRoutes.js";
import productRouter from "./routes/productRouter.js";
import signupRoutes from "./routes/signupRoutes.js";
import orgSignupRoutes from "./routes/orgSignupRoutes.js"; // ADD THIS
import adminRoutes from "./routes/adminRoutes.js";
import verifyRoutes from "./routes/verifyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

import "./routes/cronJobs.js";

const app = express();
app.use(cors());
app.use(express.json());

// Make db available to all routes
app.set("db", db);

// Routes
app.use("/api/auctions", auctionsRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/auth/verify", verifyRoutes);
app.use("/api/auth", authRoutes); // login, other auth
app.use("/api/signup", signupRoutes); // personal signup
app.use("/api/org-signup", orgSignupRoutes); // ADD THIS - organization signup
app.use("/api/users", usersRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
