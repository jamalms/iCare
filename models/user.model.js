const bcrypt = require('bcryptjs');


const db = require('../data/database');

class User {
    constructor(email, password, fullname, birthDate, gender, phone, address) {
        this.email = email;
        this.phone = phone,
        this.password = password;
        this.name = fullname;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address
    }

    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        return db
          .getDb()
          .collection('users')
          .findOne({ _id: uid }, { projection: { password: 0 } });
      }


    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email });
    }

    async existingAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword, 
            fullname: this.name,
            birthDate: this.birthDate,
            gender: this.gender,
            phone: this.phone,
            address: this.address
        });

    }

  
    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
      }
}

module.exports = User;