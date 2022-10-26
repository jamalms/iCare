const db = require('../data/database');

class Medication {
    constructor(patientData, medicationName, startDate, endDate, route, dose, time, note, medId) {
      this.patientData = patientData;
      this.medicationName = medicationName;
      this.startDate = startDate;
      this.endDate = endDate;
      this.route = route;
      this.dose = dose;
      this.time = time; 
      this.note = note;
      this.medId = medId;
    }
  
   

    async save() {
      if (this.id) {
        //Updating
      } else {
        const medicationData = { //patientData medicationName, startDate, endDate, route, dose, time, note
          patientData: this.patientData,
          medicationName: this.medicationName,
          startDate: this.startDate,
          endDate: this.endDate,
          route: this.route,
          dose: this.dose,
          time: this.time,
          note: this.note,
          medId: this.medId,
        };
    
        return  db.getDb().collection('medications').insertOne(medicationData);
      }
    }
  

    
  }
  
  module.exports = Medication;