const mongodb = require('mongodb');

const db = require('../data/database');

class Patient {  // pTfullname, pTbirthDate, pTgender, pTphone, pTaddress
  constructor(patientData) {
    this.pTfullname = patientData.pTfullname;
    this.pTbirthDate = patientData.pTbirthDate;
    this.pTgender = patientData.pTgender;
    this.pTphone = patientData.pTphone;
    this.pTaddress = patientData.pTaddress;
    this.image = patientData.image; // the name of the image file
    this.updateImageData();
    if (patientData._id) {
      this.id = patientData._id.toString();
    }
  }

  static async findById(patientId) {
    let ptId;
    try {
      ptId = new mongodb.ObjectId(patientId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const patient = await db
      .getDb()
      .collection('patients')
      .findOne({ _id: ptId });

    if (!patient) {
      const error = new Error('Could not find patient with provided id.');
      error.code = 404;
      throw error;
    }

    return new Patient(patient);
  }

  static async findAll() {
    const patients = await db.getDb().collection('patients').find().toArray();

    return patients.map(function(patientDocument) {
      return new Patient(patientDocument);
    });
  }

  updateImageData() {
    this.imagePath = `patient-data/images/${this.image}`;
    this.imageUrl = `/patients/assets/images/${this.image}`;
  }

  async save() {
    const patientData = { 
        pTfullname: this.pTfullname,
        pTbirthDate: this.pTbirthDate,
        pTgender: this.pTgender,
        pTphone: this.pTphone,
        pTaddress: this.pTaddress,
        image: this.image
    };

    const medicationData = { //patientData medicationName, startDate, endDate, route, dose, time, note
      medication: this.medication,
      startDate: this.startDate,
      endDate: this.endDate,
      route: this.route,
      dose: this.dose,
      time: this.time,
      note: this.note,
      medId: this.medId,
    };

    if (this.id) {
      const patientId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete patientData.image;
      }

      await db.getDb().collection('patients').updateOne(
        { _id: patientId },
        {
          $set: patientData,
        }
      );
      await db.getDb().collection('patients').updateOne(
        { _id: patientId },
        {
          $set: medicationData,
        }
      );
    } else {
      await db.getDb().collection('patients').insertOne(patientData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const patientId = new mongodb.ObjectId(this.id);
    return db.getDb().collection('patients').deleteOne({ _id: patientId });
  }

}

module.exports = Patient;