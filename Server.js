const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Monogdb connection error", err));

const recipeRoutes = require("./routes/recipe");
const ingredientRoutes = require("./routes/ingredient");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
app.use("/recipe", recipeRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
