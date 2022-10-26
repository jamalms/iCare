const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
//const sqlDb = require('./data/sqlDatabase');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes'); 
const medicationMiddleware = require('./middlewares/medication');
const authRoutes = require('./routes/auth.routes');
const servicesRoutes = require('./routes/services.routes'); 
const patientRoutes = require('./routes/patients.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const drRoutes = require('./routes/dr.routes');
const medicalProfileRoutes = require('./routes/medicalProfile.routes');
const cardiacRoutes = require('./routes/cardiac.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/patients/assets', express.static('patient-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(medicationMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(servicesRoutes);
app.use(protectRoutesMiddleware);
app.use(patientRoutes);
app.use('/admin', adminRoutes);
app.use('/dr', drRoutes);
app.use(medicalProfileRoutes);
app.use('/dr', cardiacRoutes);

app.use(errorHandlerMiddleware);

db.connecteToDatabase()
.then(function (){
    app.listen(3000);
})
.catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
});
