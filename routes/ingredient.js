const express = require("express");
const router = express.Router();

const ingredient = require("../models/Ingredient");
const Ingredient = require("../models/Ingredient");

//add new ingredient
router.post("/", async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).send({ message: "Ingredient created" }, ingredient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all ingredients
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).send(ingredients);
  } catch (error) {
    res.status(500).send;
  }
});

//get ingredient by name
router.get("/:name", async (req, res) => {
  try {
    const ingredient = await Ingredient.findOne({ name: req.params.name });

    res.status(200).send(ingredient);
  } catch (error) {
    res.status(500).send;
  }
});

//edit ingredient
router.put("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findOneAndUpdate(
      { IngredientId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).send(ingredient);
  } catch (error) {
    res.status(400).send;
  }
});

//remove ingredient
router.delete("/:id", async (req, res) => {
  try {
    const result = await Ingredient.deleteOne({ IngredientId: req.params.id });

    if (result.deletedCount === 0)
      return res.status(404).send("ingredient not found");

    res.status(200).send("ingredient deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
