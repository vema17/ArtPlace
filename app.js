const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());  // Para leer JSON en el cuerpo de las solicitudes

// Rutas
app.use('/api', userRoutes);  // Usamos /api como prefijo para las rutas de usuarios

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
