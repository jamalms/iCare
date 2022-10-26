const Medication = require('../models/medication.model');

function initializeMedCart(req, res, next) {
  let medication;

  if (!req.session.medication) {
    medication = new Medication();
  } else {
    const sessionMedication = req.session.medication;
    medication = new Medication(
      sessionMedication.medications
     
    );
  }

  res.locals.medication = medication;

  next();
}

module.exports = initializeMedCart;
