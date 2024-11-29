const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_RATING_HOST,
  user: process.env.MYSQL_RATING_USER,
  password: process.env.MYSQL_RATING_PASSWORD,
  database: process.env.MYSQL_RATING_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

connection.connect(err => {
    if (err) {
      console.error('Error conectando a MySQL:', err.stack);
      return;
    }
    console.log('Conectado a MySQL.');
  });

module.exports = connection;
