const router = require("express").Router();

const {
  User,
  user_validation,
  user_validation_login,
} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// add user to DB
router.post("/signup", async (req, res) => {
  let result= user_validation.validate(req.body);

  if (!result)
    return res.status(400).send(result.error.details[0].message);
  try {
    let salt = await bcrypt.genSalt(10);

    let user = new User(req.body);
    user.password = await bcrypt.hash(user.password, salt);
    //console.log('pass : ', user.password);
    await user.save();
    res.status(201).send("Registration Success!!");
  } catch (err) {
    res.status(400).send("Error in registration : " + err.message);
  }
});

router.post("/signin", async (req, res) => {
  let result = user_validation_login.validate(req.body);
  if (!result)
    return res.status(400).send(result.error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("email or password is incorrect");
    let bool = await bcrypt.compare(req.body.password, user.password);
    if (!bool) return res.status(400).send("email or password is incorrect");
    let token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "jwtSecret",
      { expiresIn: "1h" }
    );
    res.header("x-access-token", token).send("Login Success !!!");
  } catch (err) {
    res.status(400).send("Error in registration : " + err.message);
  }
});

module.exports = router;
