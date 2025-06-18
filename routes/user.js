const express = require("express");
const router = express.Router();

const User = require("../models/User");

//add user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("User Created");
  } catch (error) {
    res.status(400).send(error);
  }
});
//show all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//edit user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true, runValidators: true } // return updated doc + validate
    );

    if (!user) {
      return res.status(404).send("user not found");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//remove recipe
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ userId: req.params.id });

    if (result.deletedCount === 0)
      return res.status(404).send("User not found");

    res.status(200).send("User deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
