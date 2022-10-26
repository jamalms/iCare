const express = require('express');

const patientController = require('../controllers/patients.controller');

const router = express.Router();

router.get('/patients-list', patientController.getAllpatients);

router.get('/patients-list/:id', patientController.getPatientDetails);



module.exports = router;