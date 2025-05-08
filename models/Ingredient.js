const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  IngredientId: { type: Number, require: true, unique: true },
  name: { type: String, require: true },
  quantity: { type: String, require: true },
  recipeId: { type: Number, require: true },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
