const express = require("express");

const router = express.Router();

const category = require("../models/Category");
const Category = require("../models/Category");

//add new category
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send({ message: "Category created" }, category);
  } catch (error) {
    res.status(400).send(error);
  }
});

//show all gategories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

//show category by name
router.get("/:name", async (req, res) => {
  try {
    const category = await Category.find({ categoryName: req.params.name });
    res.status(200).send(category); //show name only
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete category
router.delete("/:name", async (req, res) => {
  try {
    const result = await Category.deleteOne({ categoryName: req.params.name });

    if (result.deletedCount === 0)
      return res.status(404).send("Category not found");

    res.status(200).send("Category deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
