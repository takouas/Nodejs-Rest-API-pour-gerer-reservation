const mongoose = require("mongoose");
const Joi = require("joi");

const certification_schema = new mongoose.Schema({
  nomCertif: String,
  isAvalible: Boolean,
  Reservation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});

let certification_validation = Joi.object({
  nomCertif: Joi.string().min(3).required(),
  isAvalible: Joi.boolean().required(),
});
let certification_validation_update = Joi.object({
  nomCertif: Joi.string().min(3).required(),
  isAvalible: Joi.boolean().required(),
});

const Certification = mongoose.model("Certification", certification_schema);

module.exports = {
  Certification: Certification,
  certification_validation: certification_validation,
  certification_validation_update: certification_validation_update,
};
