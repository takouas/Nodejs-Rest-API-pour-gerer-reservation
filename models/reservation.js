const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
let reservation_schema = new mongoose.Schema({
  certification: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "certification",
    },
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  date: Date,
});

let reservation_validation = Joi.object({
  certification: Joi.string().min(3).required(),
  user: Joi.string().min(3).required(),
  date: Joi.date().required(),
});

let reservation_validation_update = Joi.object({
  certification: Joi.string().min(3).required(),
  user: Joi.string().min(3).required(),
  date: Joi.date().required(),
});
let Reservation = mongoose.model("reservation", reservation_schema);

module.exports = {
  Reservation: Reservation,
  reservation_validation: reservation_validation,
  reservation_validation_update: reservation_validation_update,
};
