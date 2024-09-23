const mysql = require('mysql2');

// Crear la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'db',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'rootpassword',
  database: process.env.MYSQL_DATABASE || 'mi_base_de_datos'
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err.stack);
    return;
  }
  console.log('Conectado a MySQL.');
});

module.exports = connection;
