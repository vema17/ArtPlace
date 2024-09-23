const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Conectar a MySQL
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

    // Extraer el nombre de las tablas
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

// Nueva ruta para mostrar el contenido de una tabla
app.get('/tablas/:nombre', (req, res) => {
  const nombreTabla = req.params.nombre;

  // Consulta para obtener todos los registros de la tabla especificada
  connection.query(`SELECT * FROM ??`, [nombreTabla], (err, results) => {
    if (err) {
      return res.status(500).send(`Error al consultar la tabla ${nombreTabla}`);
    }

    if (results.length === 0) {
      return res.send(`<h1>No hay registros en la tabla ${nombreTabla}</h1>`);
    }

    // Construir una tabla HTML para mostrar los registros
    const keys = Object.keys(results[0]);
    const html = `
      <h1>Contenido de la tabla ${nombreTabla}</h1>
      <table border="1">
        <thead>
          <tr>${keys.map(key => `<th>${key}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${results.map(row => `
            <tr>${keys.map(key => `<td>${row[key]}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;

    res.send(html);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
