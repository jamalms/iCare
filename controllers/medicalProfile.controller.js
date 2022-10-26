const sqlDb = require('../data/sqlDatabase');


async function getAllpatients(req, res) {
  try{
    const [patients] = await sqlDb.query('SELECT * FROM iCARE.patients');
    res.render('doctor/medical/patients-list', { patients: patients });
  }catch (erroe) {
  next(erorr);
  }  
  
}



  async function getPatientDetails(req, res){ 
    const query = `
    SELECT * FROM iCARE.patients WHERE id = ?
  `;
 
  const [patients] = await sqlDb.query(query, [req.params.id]);
 
  if (!patients || patients.length === 0) {
    return res.status(404).render('404');
  }
 
  const ptDate = {
    ...patients[0],
    registrationDate: patients[0].registrationDate.toISOString(),
    //pTbirthDate: patients[0].pTbirthDate.toISOString(),
    humanReadableDate: patients[0].registrationDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
 
  };
 
    res.render('doctor/medical/patient-details', {patient: ptDate});
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
    req.body.uploadFile,
    req.body.mainComplain,
   ];
  await sqlDb.query('INSERT INTO iCARE.medicalProfile(patient_id, healthHistory, diagnosis, medications, allergies, uploadFile, mainComplain) VALUES (?)', [
    data,
  ]);
  
  res.redirect('/dr/medicalProfile');
}

async function showmedicalProfile(req, res){
  const query = ` 
  SELECT iCARE.medicalProfile.*, iCARE.patients.* FROM iCARE.medicalProfile
  INNER JOIN iCARE.patients ON (medicalProfile.patient_id = patients.id);
  `;
  const [medicalProfiles] = await sqlDb.query(query);
  res.render('doctor/medical/medicalProfile', { medicalProfiles: medicalProfiles});
}

async function getmedicalProfileDetails(req, res){ 
  const query = `

  SELECT iCARE.medicalProfile.*, iCARE.patients.* FROM iCARE.medicalProfile
  INNER JOIN iCARE.patients ON (medicalProfile.patient_id = patients.id)
  WHERE iCARE.medicalProfile.id = ?
`;

const [medicalProfiles] = await sqlDb.query(query, [req.params.id]);

  res.render('doctor/medical/medicalProfile-details', {medicalProfile: medicalProfiles});
}


module.exports = {
    getAllpatients: getAllpatients,
    getPatientDetails: getPatientDetails,

    getMedicalProfile: getMedicalProfile,
    addMedicalProfile: addMedicalProfile,
    insertIntoMedicalProfile: insertIntoMedicalProfile,
    showmedicalProfile: showmedicalProfile,
    getmedicalProfileDetails: getmedicalProfileDetails,

}