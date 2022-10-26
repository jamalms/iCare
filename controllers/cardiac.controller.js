const sqlDb = require('../data/sqlDatabase');

//To add a Cardiac Reading , the doctor must log in.

async function cardiacApp(req, res) {
  try{
    const [patients] = await sqlDb.query('SELECT * FROM iCARE.patients');
    res.render('doctor/cardiac/cardiacApp', { patients: patients });
  }catch (erroe) {
  next(erorr);
  }  
  
}

async function getHeartReading(req, res) {
  const data = [ 
    req.body.patient_id,
    req.body.results,
    
   ];  
  await sqlDb.query('INSERT INTO iCARE.cardiacReadings(patient_id, results) VALUES (?)', [
    data,
  ]);
  
  res.redirect('/dr/cardiacPatients');
}

async function getAllpatients(req, res) {
  try{
    const [cardiacReadings] = await sqlDb.query('SELECT * FROM iCARE.cardiacReadings');
    res.render('doctor/cardiac/cardiacPatients', { cardiacReadings: cardiacReadings });
  }catch (erroe) {
  next(erorr);
  }  
  
}


async function getCardiacResults(req, res){
  const query = ` 
  SELECT iCARE.cardiacReadings.*, iCARE.patients.pTfullname AS patient_name FROM iCARE.cardiacReadings
  INNER JOIN iCARE.patients ON (cardiacReadings.patient_id = patients.id);
  
  `;
  const [cardiacReadings] = await sqlDb.query(query);
  res.render('doctor/cardiac/cardiacPatients', { cardiacReadings: cardiacReadings});
}

//To Update a Cardiac Reading , the doctor must log in.

async function getUpdate(req, res){
  const query = ` 
  SELECT * FROM iCARE.cardiacReadings WHERE id = ? 
  `;
  const [cardiacReadings] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/cardiac/update-cardiacResult', {cardiacReading: cardiacReadings[0]});
}

async function updateResults(req, res) {
  const query = `
  
  UPDATE iCARE.cardiacReadings SET results = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.results,
  req.params.id,
]);
res.redirect('/dr/cardiacPatients');
}

//To Delete a Cardiac Reading , the doctor must log in.

async function deleteResult(req, res){
  await sqlDb.query('DELETE FROM iCARE.cardiacReadings WHERE id = ?', [req.params.id]);
  res.redirect('/dr/cardiacPatients');
}




//To Add a Respiratory ssessment , the doctor must log in.

async function ventilationApp(req, res) {
  try{
    const [patients] = await sqlDb.query('SELECT * FROM iCARE.patients');
    res.render('doctor/cardiac/ventilationApp', { patients: patients });
  }catch (erroe) {
  next(erorr);
  }  
}

async function getRespiReadings(req, res) {
  const data = [ 
    req.body.patient_id,
    req.body.results,
    
   ];  
  await sqlDb.query('INSERT INTO iCARE.respiratoryReadings(patient_id, results) VALUES (?)', [
    data,
  ]);
  
  res.redirect('/dr/ventilatedPatients');
}



async function ventilatedPatients(req, res){
  const query = ` 
  SELECT iCARE.respiratoryReadings.*, iCARE.patients.pTfullname AS patient_name FROM iCARE.respiratoryReadings
INNER JOIN iCARE.patients ON (respiratoryReadings.patient_id = patients.id);
  
  `;
  const [respiratoryReadings] = await sqlDb.query(query);
  res.render('doctor/cardiac/ventilatedPatients', { respiratoryReadings: respiratoryReadings});
}
 

//To Update a Respiratory ssessment report , the doctor must log in.

async function getUpdateVent(req, res){
  const query = ` 
  SELECT * FROM iCARE.respiratoryReadings WHERE id = ? 
  `;
  const [respiratoryReadings] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/cardiac/update-ventelationResult', {respiratoryReading: respiratoryReadings[0]});
}

async function UpdateVent(req, res) {
  const query = `
  
  UPDATE iCARE.respiratoryReadings SET results = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.results,
  req.params.id,
]);
res.redirect('/dr/ventilatedPatients');
}


//To Delete a Respiratory ssessment report , the doctor must log in.

async function deleteVenResult(req, res){
  await sqlDb.query('DELETE FROM iCARE.respiratoryReadings WHERE id = ?', [req.params.id]);
  res.redirect('/dr/ventilatedPatients');
}


async function glucoCheckApp(req, res) {
  try{
    const [patients] = await sqlDb.query('SELECT * FROM iCARE.patients');
    res.render('doctor/cardiac/glucoCheckApp', { patients: patients });
  }catch (erroe) {
  next(erorr);
  }  
}

async function glucoCheck(req, res) {
  const data = [ 
    req.body.patient_id,
    req.body.results,
    
   ];  
  await sqlDb.query('INSERT INTO iCARE.glucoCheck(patient_id, results) VALUES (?)', [
    data,
  ]);
  
  res.redirect('/dr/glucoResults');
}

//To Add a Glucose Reading , the doctor must log in.

async function getGlucoCheck(req, res){ 
  const query = ` 
  SELECT iCARE.glucoCheck.*, iCARE.patients.pTfullname AS patient_name FROM iCARE.glucoCheck
INNER JOIN iCARE.patients ON (glucoCheck.patient_id = patients.id);
  
  `;
  const [glucoChecks] = await sqlDb.query(query);
  res.render('doctor/cardiac/glucoResults', { glucoChecks: glucoChecks});
}

//To Update a Glucose Reading report , the doctor must log in.
async function getUpdateGluco(req, res){
  const query = ` 
  SELECT * FROM iCARE.glucoCheck WHERE id = ? 
  `;
  const [glucoChecks] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/cardiac/update-glucoResult', {glucoCheck: glucoChecks[0]});
}

async function UpdateGluco(req, res) {
  const query = `
  
  UPDATE iCARE.glucoCheck SET results = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.results,
  req.params.id,
]);
res.redirect('/dr/glucoResults');
}

//To Delete a Glucose Reading report , the doctor must log in.

async function deleteGluco(req, res){
  await sqlDb.query('DELETE FROM iCARE.glucoCheck WHERE id = ?', [req.params.id]);
  res.redirect('/dr/glucoResults');
}





 
module.exports = {
  cardiacApp: cardiacApp,
  getHeartReading: getHeartReading,
  getCardiacResults: getCardiacResults,
  getUpdate: getUpdate,
  updateResults: updateResults,
  deleteResult: deleteResult,
  ventilationApp: ventilationApp,
  ventilatedPatients: ventilatedPatients,
  getRespiReadings: getRespiReadings,
  getUpdateVent: getUpdateVent,
  UpdateVent: UpdateVent,
  deleteVenResult: deleteVenResult,
  glucoCheckApp: glucoCheckApp,
  getGlucoCheck: getGlucoCheck,
  glucoCheck: glucoCheck,
  getUpdateGluco: getUpdateGluco,
  UpdateGluco: UpdateGluco,
  deleteGluco: deleteGluco,
  
  
}
