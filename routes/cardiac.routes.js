const express = require('express');


const cardiacController = require('../controllers/cardiac.controller');

const router = express.Router(); 

router.get('/cardiacApp', cardiacController.cardiacApp);
router.post('/cardiacPatients', cardiacController.getHeartReading); 
router.get('/cardiacPatients', cardiacController.getCardiacResults); 
router.get('/update-cardiacResult/:id/edit', cardiacController.getUpdate); 
router.post('/cardiacPatients/:id/edit', cardiacController.updateResults);
router.post('/cardiacPatients/:id/delete', cardiacController.deleteResult);
router.get('/ventilationApp', cardiacController.ventilationApp); 
router.get('/ventilatedPatients', cardiacController.ventilatedPatients); 
router.post('/ventilatedPatients', cardiacController.getRespiReadings); 
router.get('/update-ventelationResult/:id/edit', cardiacController.getUpdateVent);
router.post('/ventilatedPatients/:id/edit', cardiacController.UpdateVent); 
router.post('/ventilatedPatients/:id/delete', cardiacController.deleteVenResult); 
router.get('/glucoCheckApp', cardiacController.glucoCheckApp); 
router.get('/glucoResults', cardiacController.getGlucoCheck); 
router.post('/glucoResults', cardiacController.glucoCheck); 
router.get('/update-glucoResult/:id/edit', cardiacController.getUpdateGluco);
router.post('/glucoResults/:id/edit', cardiacController.UpdateGluco);
router.post('/glucoResults/:id/delete', cardiacController.deleteGluco); 







module.exports = router;