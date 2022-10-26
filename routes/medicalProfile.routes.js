const express = require('express');

const medicalProfileController = require('../controllers/medicalProfile.controller');

const router = express.Router();

//router.get('/patients-list', patientController.getAllpatients);

//router.get('/patients-list/:id', patientController.getPatientDetails);

router.get('/medicalprofile', medicalProfileController.showmedicalProfile); 
router.get('/add-medicalProfile', medicalProfileController.addMedicalProfile); 
router.post('/medicalprofile', medicalProfileController.insertIntoMedicalProfile); 
router.get('/medicalProfile-details/:id', medicalProfileController.getmedicalProfileDetails); 



module.exports = router;