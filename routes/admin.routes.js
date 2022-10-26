const express = require('express');
const sqlDb = require('../data/sqlDatabase');

const adminController = require('../controllers/admin.controller');


const router = express.Router();

router.get('/patients', adminController.showAllPatients);

router.get('/add-patient', adminController.getPageAddPatient); 


router.post('/patients', adminController.addNewPatient);

router.get('/patients/:id', adminController.getPatientDetails);

router.get('/patients/:id/edit', adminController.getUpdatePatient);

router.post('/patients/:id/edit', adminController.updatePatient); 

router.post('/patients/:id/delete', adminController.deletePatient); 





module.exports = router;