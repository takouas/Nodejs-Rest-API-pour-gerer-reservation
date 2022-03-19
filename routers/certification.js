const router = require("express").Router();

const {
  Certification,
  certification_validation,certification_validation_update
} = require("../models/certification");

// get All certification
router.get("", async (req, res) => {
  res.send(await Certification.find());
});
// get all certification from courses with given id
router.get("/:id", async (req, res) => {
  res.send(await Certification.findById(req.params.id));
});
// get all certification from courses with given name
router.get("/:nomCertif", async (req, res) => {
  res.send(await Certification.findByName(req.params.nomCertif));
});
// get all certification if isAvalible true,

router.get("/avalible", async (req, res) => {
  res.send(await Certification.find({ isAvalible: true }));
});

// add certif to DB
router.post("", async (req, res) => {
    let results = certification_validation.validate(req.body);
    if (results.error)
      return res.status(400).send(results.error.details[0].message);
      try {
    let certification = new Certification(req.body);

    res.send(await certification.save());
  } catch (error) {
    res.status(400).send("Error saving certification :" + error.message);
  }
});
//update
router.put("/:id", async (req, res) => {
    try {  let results= certification_validation_update.validate(req.body);
  if (results.error)
    return res.status(400).send(results.error.details[0].message);

  await certification.updateOne({ _id: req.params.id }, req.body);
  res.send(await certification.findById(req.params.id));
} catch (error) {
    res.status(400).send('Error updating certif :'+error.message);
}
});


// delete by id

router.delete("/:id", async (req, res) => {
  try {
    let certif = await certification.findByIdAndRemove(req.params.id);
    if (!certif) return res.status(404).send("certif with id is not found");
    res.send(certif);
  } catch (error) {
    res.status(400).send("Error Deleting certif :" + error.message);
  }
});

module.exports = router;
