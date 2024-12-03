const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_USER_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_USER_PASSWORD || 'rootpassword',
  database: process.env.MYSQL_USER_DATABASE || 'user_service'
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err.stack);
    return;
  }
  console.log('Conectado a MySQL.');
});

module.exports = connection;
