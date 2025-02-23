import express from "express";
import dotenv from "dotenv";
import { route } from "./route.js"; // Ensure the correct file extension
import mongoose from "mongoose";
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
// ✅ Ensure JSON and URL-encoded body parsing is enabled BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGODB CONNECTION ESTABLISHMENT
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.use("/userDreamsDB", route); // Ensure routes are applied after middleware
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
