import express from "express";
import cors from "cors";
import auctionsRoutes from "./routes/auctionsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auctions", auctionsRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
