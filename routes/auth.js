const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
//const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// GET register page
router.get("/register", (req, res) => res.render("register"));

// POST register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findone({ email });
    if (existingUser) return res.send("Email already registered.");

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hash });
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Registration error");
  }
});

// GET login page
router.get("/login", (req, res) => res.render("login"));

// POST login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findone({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.send("Invalid login");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token).redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Login error");
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/login");
});
module.exports = router;
