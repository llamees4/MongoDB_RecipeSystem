// Load environment variables
require("dotenv").config();

// Module imports
const express = require("express");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use only express.json() for JSON parsing
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data
app.use(cookieParser());
app.use(express.static("public"));

// Set EJS as view engine
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    // Consider a more graceful exit or retry mechanism here
    process.exit(1); // Exit with an error code
  });

// Routes (Example -  Add your actual route handlers)
app.get("/", (req, res) => {
  res.render("index"); // Assumes you have an 'index.ejs' file
});

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipe");
const ingredientRoutes = require("./routes/ingredient");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

app.use("/auth", authRoutes); // Changed to /auth to avoid conflict
app.use("/recipe", recipeRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

// Error Handling Middleware (Example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
