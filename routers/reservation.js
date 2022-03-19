const router = require("express").Router();

const {
  Reservation, reservation_validation,
  reservation_validation_update,
} = require("../models/reservation");

// get All Reservation
router.get("", async (req, res) => {
  res.send(await Reservation.find());
});
// get all Reservation from courses with given id
router.get("/:id", async (req, res) => {
  res.send(await Reservation.findById(req.params.id));
});
// get all Reservation from courses with given date
router.get("/:date", async (req, res) => {
    res.send(await Reservation.find({date:req.params.date }));

  });
// add reservation to DB
router.post("", async (req, res) => {
  try {
    let results = reservation_validation.validate(req.body);
    if (results.error)
      return res.status(400).send(results.error.details[0].message);

    let reservation = new Reservation(req.body);

    res.send(await reservation.save());
  } catch (error) {
    res.status(400).send("Error saving Reservation :" + error.message);
  }
});
//update
router.put("/:id", async (req, res) => {
    try {  let results= reservation_validation_update.validate(req.body);
  if (results.error)
    return res.status(400).send(results.error.details[0].message);

  await Reservation.updateOne({ _id: req.params.id }, req.body);
  res.send(await Reservation.findById(req.params.id));
} catch (error) {
    res.status(400).send('Error updating reservation :'+error.message);
}
});


// delete by id

router.delete("/:id", async (req, res) => {
  try {
    let reservation = await Reservation.findByIdAndRemove(req.params.id);
    if (!reservation) return res.status(404).send("reservation with id is not found");
    res.send(reservation);
  } catch (error) {
    res.status(400).send("Error Deleting reservation :" + error.message);
  }
});

module.exports = router;
