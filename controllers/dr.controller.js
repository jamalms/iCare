const sqlDb = require('../data/sqlDatabase');

function allReports(req, res) {
  res.render('doctor/medical/all-reports');
}

function medication(req, res) {
  res.render('doctor/medical/medication');
}



async function newMed(req, res) {
  const [patients] = await sqlDb.query('SELECT * FROM patients');
  res.render('doctor/medical/medication', {patients: patients});
}

async function addMedd(req, res) {
  
  const data = [ 
    req.body.medication,
    req.body.route,
    req.body.dose,
    req.body.time,
    req.body.startDate,
    req.body.endDate,
    req.body.patient_id,
    req.body.note,
  
];
 await sqlDb.query('INSERT INTO iCARE.medications (medication, route, dose, time, startDate, endDate, patient_id, note ) VALUES (?)', [
    data,
]);
res.redirect('/dr/all-medications');

}

async function showAllmedications(req, res){
  const query = ` 
  SELECT iCARE.medications.*, iCARE.patients.pTfullname FROM iCARE.medications
INNER JOIN iCARE.patients ON medications.patient_id = patients.id

  `;
  const [medications] = await sqlDb.query(query);

  res.render('doctor/medical/all-medications', { medications: medications });
}





async function getUpdateMedication(req, res){
  const query = ` 
  SELECT * FROM iCARE.medications WHERE id = ?
  `;
  const [medications] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/medical/update-medication', {medication: medications[0]});
}

async function updateMedication(req, res) {
  const query = `
  
  UPDATE iCARE.medications SET medication = ?, route = ?, dose = ?, time = ?, startDate = ?, endDate = ?, note = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.medication,
  req.body.route,
  req.body.dose,
  req.body.time,
  req.body.startDate,
  req.body.endDate,
  req.body.note,
  req.params.id,
]);
res.redirect('/dr/all-medications');
}

async function deleteMedication(req, res){
  await sqlDb.query('DELETE FROM iCARE.medications WHERE id = ?', [req.params.id]);
  res.redirect('/dr/all-medications');
}



async function getPatientDetails(req, res){ 
  const query = `
  SELECT iCARE.treatment.*, iCARE.patients.pTfullname AS patient_name, iCARE.med.medicationName AS medication FROM iCARE.treatment
  INNER JOIN iCARE.patients ON (treatment.patient_id = patients.id)
  INNER JOIN iCARE.med ON (treatment.med_id = med.id) 
`;
const [trets] = await sqlDb.query(query);
res.render('doctor/medical/medicalProfile', {trets: trets});
}



async function getRepot(req, res){
  const [patients] = await sqlDb.query('SELECT * FROM patients');
  res.render('doctor/medical/add-reports', {patients: patients});
}

async function addReport(req, res) {
  const data = [ 
    req.body.patient_id,
    req.body.report,
   ];
  await sqlDb.query('INSERT INTO iCARE.reports (patient_id, report) VALUES (?)', [
    data,
  ]);
  
  res.redirect('/dr/all-reports');
}


  async function showAllReports(req, res){
  const query = ` 
  SELECT iCARE.reports.*, iCARE.patients.pTfullname AS patient_name FROM iCARE.reports
  INNER JOIN iCARE.patients ON (reports.patient_id = patients.id);
  `;
  const [reports] = await sqlDb.query(query);
  res.render('doctor/medical/all-reports', { reports: reports});
}

async function getUpdateReport(req, res){
  const query = ` 
  SELECT * FROM iCARE.reports WHERE id = ?
  `;
  const [reports] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/medical/update-report', {report: reports[0]});
}


async function updateReport(req, res) {
  const query = `
  
  UPDATE iCARE.reports SET report = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.report,
  req.params.id,
]);
res.redirect('/dr/all-reports');
}

async function deleteReport(req, res){
  await sqlDb.query('DELETE FROM iCARE.reports WHERE id = ?', [req.params.id]);
  res.redirect('/dr/all-reports');
}

 function getMedicalProfile(req, res){

  res.render('doctor/medical/medicalProfile');
}

async function addMedicalProfile(req, res) {
const [patients] = await sqlDb.query('SELECT * FROM patients');
res.render('doctor/medical/add-medicalProfile', {patients: patients});
}

async function insertIntoMedicalProfile(req, res) {
  const data = [ 
    req.body.patient_id,
    req.body.healthHistory,
    req.body.diagnosis,
    req.body.medications,
    req.body.allergies,
    //req.body.uploadFile,
    req.body.mainComplain,
   ];
  await sqlDb.query('INSERT INTO iCARE.medicalProfile(patient_id, healthHistory, diagnosis, medications, allergies, mainComplain) VALUES (?)', [
    data,
  ]);
  
  res.redirect('/dr/medicalProfile');
}

async function showmedicalProfile(req, res){
  const query = ` 
  SELECT iCARE.medicalProfile.*, iCARE.patients.pTfullname  FROM iCARE.medicalProfile
  INNER JOIN iCARE.patients ON (medicalProfile.patient_id = patients.id);
  
  `;
  const [medicalProfiles] = await sqlDb.query(query);
  res.render('doctor/medical/medicalProfile', { medicalProfiles: medicalProfiles});
}

async function getmedicalProfileDetails(req, res){ 
  const query = `

  SELECT iCARE.medicalProfile.*, iCARE.patients.pTfullname  FROM iCARE.medicalProfile
  INNER JOIN iCARE.patients ON (medicalProfile.patient_id = patients.id)
  WHERE medicalProfile.id = ?
`;

const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);

  res.render('doctor/medical/medicalProfile-details', {medicalProfile: medicalProfiles[0]});
}




async function getUpdatediagnosis(req, res){
  const query = ` 
  SELECT * FROM iCARE.medicalProfile WHERE id = ?
  `;
  const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/medical/update-diagnosis', {medicalProfile: medicalProfiles[0]});
}

async function updateDiagnosis(req, res) {
  const query = `
  UPDATE iCARE.medicalProfile SET diagnosis = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.diagnosis,
  req.params.id,
]);
res.redirect('/dr/medicalProfile');
}




async function getUpdatemeds(req, res){
  const query = ` 
  SELECT * FROM iCARE.medicalProfile WHERE id = ?
  `;
  const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/medical/update-meds', {medicalProfile: medicalProfiles[0]});
}

async function updateMeds(req, res) {
  const query = `
  UPDATE iCARE.medicalProfile SET medications = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.medications,
  req.params.id,
]);
res.redirect('/dr/medicalProfile');
}

async function getUpdateMainC(req, res){
  const query = ` 
  SELECT * FROM iCARE.medicalProfile WHERE id = ?
  `;
  const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);
  res.render('doctor/medical/update-mainComplain', {medicalProfile: medicalProfiles[0]});
}


async function updatemainComplains(req, res) {
  const query = `
  UPDATE iCARE.medicalProfile SET mainComplain = ?
  WHERE id = ?
`;
await sqlDb.query(query, [ 
  req.body.mainComplain,
  req.params.id,
]);
res.redirect('/dr/medicalProfile');
}


  

  async function getUpdateeditHelthH(req, res){
    const query = ` 
    SELECT * FROM iCARE.medicalProfile WHERE id = ?
    `;
    const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);
    res.render('doctor/medical/update-healthHistory', {medicalProfile: medicalProfiles[0]});
  }

  async function updateeditHelthH(req, res) {
    const query = `
    UPDATE iCARE.medicalProfile SET healthHistory = ?
    WHERE id = ?
  `;
  await sqlDb.query(query, [ 
    req.body.healthHistory,
    req.params.id,
  ]);
  res.redirect('/dr/medicalProfile');
  }

  

  async function getUpdateag(req, res){
    const query = ` 
    SELECT * FROM iCARE.medicalProfile WHERE id = ?
    `;
    const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);
    res.render('doctor/medical/update-allergies', {medicalProfile: medicalProfiles[0]});
  }

  async function updateAg(req, res) {
    const query = `
    UPDATE iCARE.medicalProfile SET allergies = ?
    WHERE id = ?
  `;
  await sqlDb.query(query, [ 
    req.body.allergies,
    req.params.id,
  ]);
  res.redirect('/dr/medicalProfile');
  }

  //healthHistory, diagnosis, medications, allergies, uploadFile, mainComplain) VALUES (?)', [
module.exports = {
 
  //allMedication: allMedication,
  allReports: allReports,
  medication: medication,
  newMed: newMed,
  addMedd: addMedd,
  showAllmedications: showAllmedications,
  getUpdateMedication: getUpdateMedication,
  updateMedication: updateMedication,
  deleteMedication: deleteMedication,
 
 
  getPatientDetails: getPatientDetails,
  getMedicalProfile: getMedicalProfile,
  addMedicalProfile: addMedicalProfile,
  getRepot: getRepot,
  addReport: addReport,
  showAllReports: showAllReports,
  getUpdateReport: getUpdateReport,
  updateReport: updateReport,
  deleteReport: deleteReport,
  insertIntoMedicalProfile: insertIntoMedicalProfile,
  showmedicalProfile: showmedicalProfile,
  getmedicalProfileDetails: getmedicalProfileDetails,

  getUpdatediagnosis:getUpdatediagnosis,
  updateDiagnosis: updateDiagnosis,
  getUpdatemeds: getUpdatemeds,
  updateMeds: updateMeds,
  getUpdateMainC: getUpdateMainC,
  updatemainComplains: updatemainComplains,
  getUpdateeditHelthH: getUpdateeditHelthH,
  updateeditHelthH: updateeditHelthH,
  getUpdateag: getUpdateag,
  updateAg: updateAg,
}
