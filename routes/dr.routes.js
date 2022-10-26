const express = require('express');

const drController = require('../controllers/dr.controller');
const patientController = require('../controllers/patients.controller');
const medicationController = require('../controllers/medication.controller');
const doctorrController = require('../controllers/dr.controller'); 



const router = express.Router();






router.get('/patients-list', patientController.getAllpatients);
//router.get('/all-reports', doctorrController.allReports); 
router.get('/medication', doctorrController.newMed);
router.post('/all-medications', doctorrController.addMedd); 
router.get('/all-medications', doctorrController.showAllmedications); 
router.get('/medication/:id/edit', doctorrController.getUpdateMedication);
router.post('/medications/:id/edit', doctorrController.updateMedication);
router.post('/medications/:id/delete', doctorrController.deleteMedication); 



//router.get('/treatment', drController.getAllTreatment);
router.get('/patient-details/:id', doctorrController.getPatientDetails);  



router.get('/all-reports', doctorrController.showAllReports); 
router.get('/add-reports', doctorrController.getRepot); 

router.post('/all-reports', doctorrController.addReport); 
router.get('/reports/:id/edit', doctorrController.getUpdateReport); 
router.post('/reports/:id/edit', doctorrController.updateReport);
router.post('/reports/:id/delete', doctorrController.deleteReport);
 
router.get('/medicalprofile', doctorrController.showmedicalProfile); 
router.get('/add-medicalProfile', doctorrController.addMedicalProfile); 
router.post('/medicalprofile', doctorrController.insertIntoMedicalProfile); 
router.get('/medicalProfile-details/:id', doctorrController.getmedicalProfileDetails); 
router.get('/update-diagnosis/:id/edit', doctorrController.getUpdatediagnosis);  
router.post('/medicalprofile/:id/edit', doctorrController.updateDiagnosis); 
router.get('/update-meds/:id/editMeds', doctorrController.getUpdatemeds);
router.post('/medicalprofile/:id/editMeds', doctorrController.updateMeds);
router.get('/update-mainComplain/:id/editMainC', doctorrController.getUpdateMainC);  
router.post('/medicalprofile/:id/editMainC', doctorrController.updatemainComplains);
router.get('/update-healthHistory/:id/editHelthH', doctorrController.getUpdateeditHelthH); 
router.post('/medicalprofile/:id/editHelthH', doctorrController.updateeditHelthH); 
router.get('/update-allergies/:id/editAg', doctorrController.getUpdateag); 
router.post('/medicalprofile/:id/editAg', doctorrController.updateAg); 







//router.get('/patient-details', drController.getMedicationsList);

//router.get('/add-medication/:id', drController.addMedication);

//router.post('/patient-details/:id', drController.updatePatient); 


module.exports = router;