const Medication = require('../models/medication.model');
const Patient = require('../models/patient.model');

function addMedication(req, res) {
  res.render('doctor/medication/add-medication');
}



module.exports = {
  addMedication: addMedication
  
};