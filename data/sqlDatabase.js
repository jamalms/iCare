const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'iCARE',
  user: 'root',
  password: 'SEANjamal2@'
});

module.exports = pool;