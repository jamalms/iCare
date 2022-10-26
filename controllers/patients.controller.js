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

module.exports = {
    getAllpatients: getAllpatients,
    getPatientDetails: getPatientDetails

}