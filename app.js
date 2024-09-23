const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Crear la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'db',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'rootpassword',
  database: process.env.MYSQL_DATABASE || 'mi_base_de_datos'
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Ruta para mostrar las tablas
app.get('/tablas', (req, res) => {
  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      return res.status(500).send('Error al consultar las tablas');
    }

    // Extraer el nombre de las tablas de los resultados
    const tablas = results.map(row => Object.values(row)[0]);

    // Renderizar las tablas en formato HTML
    res.send(`
      <h1>Tablas en la base de datos</h1>
      <ul>
        ${tablas.map(tabla => `<li>${tabla}</li>`).join('')}
      </ul>
    `);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
