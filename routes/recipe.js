const express = require("express");
const router = express.Router();

const recipe = require("../models/Recipe");
const Recipe = require("../models/Recipe");

//add recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send("Recipe Created");
  } catch (error) {
    res.status(400).send(error);
  }
});
//show all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(201).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});
//get recipe by name
router.get("/:name", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.name }).populate(
      "ingredients"
    );

    if (!recipe) {
      return res.status(400).send("Recipe doesn't exist");
    }

    const ingredients = await Ingredient.find({ recipeId: recipe._id });

    res.status(200).json({
      recipe,
      ingredients,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//edit recipe
router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { RecipeId: req.params.id },
      req.body,
      { new: true, runValidators: true } // return updated doc + validate
    );

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

//remove recipe
router.delete("/:id", async (req, res) => {
  try {
    const result = await Recipe.deleteOne({ RecipeId: req.params.id });

    if (result.deletedCount === 0)
      return res.status(404).send("Recipe not found");

    res.status(200).send("Recipe deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
