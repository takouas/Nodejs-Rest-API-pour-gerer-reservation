const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  user_validation,
  user_validation_login,
  user_validation_update,
} = require("../models/user");

// get All User
router.get("", async (req, res) => {
  res.send(await User.find());
});
// get all User from courses with given id
router.get("/:id", async (req, res) => {
  res.send(await User.findById(req.params.id));
});
// get all User from courses with given nom
router.get("/:nom", async (req, res) => {
  res.send(await User.findByName(req.params.nom));
});
// get all User from courses with given prenom
router.get("/:prenom", async (req, res) => {
  res.send(await User.findByName(req.params.prenom));
});


// delete by id

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("user with id is not found");
    res.send(user);
  } catch (error) {
    res.status(400).send("Error Deleting user :" + error.message);
  }
});

module.exports = router;
