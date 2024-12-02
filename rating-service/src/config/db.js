const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_RATING_HOST || 'rating-mysql',
  user: process.env.MYSQL_RATING_USER || 'root',
  password: process.env.MYSQL_RATING_PASSWORD || 'password',
  database: process.env.MYSQL_RATING_DATABASE || 'rating_service',
  port: process.env.MYSQL_RATING_PORT || '3306',
});

connection.connect(err => {
    if (err) {
      console.error('Error conectando a MySQL:', err.stack);
      return;
    }
    console.log('Conectado a MySQL.');
  });

module.exports = connection;
