const mongoose = require("mongoose");
const Joi = require("joi");

let user_schema = new mongoose.Schema({
  nom: String,

  prenom: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
  role: String,
  Reservation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});
let user_validation = Joi.object({
  nom: Joi.string().min(3).required(),
  prenom: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

  repeat_password: Joi.ref("password"),
  role: Joi.string(),
});

let user_validation_login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

let user_validation_update = Joi.object({
  nom: Joi.string().min(3).required(),
  prenom: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
  role: Joi.string(),
});

let User = mongoose.model("User", user_schema);

module.exports = {
  User: User,
  user_validation: user_validation,
  user_validation_login: user_validation_login,
  user_validation_update: user_validation_update,
};
