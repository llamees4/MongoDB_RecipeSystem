const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: Number, require: true, unique: true },
  username: { type: String, require: true },
  recipes: [Number], //recipesid
  email: { type: String, requied: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
