
const sqlDb = require('../data/sqlDatabase');


function patientsList(req, res) {
   res.render('admin/managment/patients-list');
}

async function showAllPatients(req, res) {
   const [patients] = await sqlDb.query('SELECT * FROM iCARE.patients');
   res.render('admin/managment/patients-list', { patients: patients });
}

function getPageAddPatient(reg, res) {  
   res.render('admin/managment/add-patient');
}

async function addNewPatient(req, res) {
   const data = [ 
       req.body.pTfullname,
       req.body.pTbirthDate,
       req.body.pTgender,
       req.body.pTphone,
       req.body.pTaddress,
       
     
   ];
    await sqlDb.query('INSERT INTO iCARE.patients (pTfullname, pTbirthDate, pTgender, pTphone, pTaddress ) VALUES (?)', [
       data,
   ]);
   res.redirect('/admin/patients');
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

   res.render('admin/managment/patient-details', {patient: ptDate});
}





async function getUpdatePatient(req, res){
   const query = ` 
   SELECT * FROM patients WHERE id = ?
   `;
   const [patients] = await sqlDb.query(query, [req.params.id]);

   if (!patients || patients.length === 0) {
       return res.status(404).render('404');
     }

   res.render('admin/managment/update-patient', {patient: patients[0]});
}

async function updatePatient(req, res) {
   const query = `
   UPDATE iCARE.patients SET pTfullname = ?, pTbirthDate = ?, pTgender = ?, pTphone = ?, pTaddress = ?
   WHERE id = ?
 `;
 await sqlDb.query(query, [ 
   req.body.pTfullname,
   req.body.pTbirthDate,
   req.body.pTgender,
   req.body.pTphone,
   req.body.pTaddress,
   req.params.id,
 ]);
 res.redirect('/admin/patients');
}


async function deletePatient(req, res){
   await sqlDb.query('DELETE FROM iCARE.patients WHERE id = ?', [req.params.id]);
   res.redirect('/admin/patients');
}

module.exports = {
   

   patientsList: patientsList,
   getPageAddPatient: getPageAddPatient,
   addNewPatient: addNewPatient,
   showAllPatients: showAllPatients,
   getPatientDetails: getPatientDetails,
   getUpdatePatient: getUpdatePatient,
   updatePatient: updatePatient,
   deletePatient: deletePatient
   
};