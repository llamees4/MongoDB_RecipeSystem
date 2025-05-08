const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  RecipeId: { type: Number, require: true, unique: true },
  title: { type: String, require: true },
  description: String,
  instructions: String,
  prepTime: String,
  createdby: { type: Number, required: true }, //userid
  category: { type: String, required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
