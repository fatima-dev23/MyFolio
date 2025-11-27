const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
require("dotenv").config();

// DATABASE CONNECTION
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Server working perfectly fine as hell"));

// user routes
app.use("/api/user", userRoutes);

// project routes
app.use("/api/project", projectRoutes);

// NOTE: removed the direct User endpoints that referenced `User` without importing it.
// If you want them back in index.js, add:
// const User = require("./models/User");
// and uncomment the endpoints.

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
