const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML en la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas protegidas (requieren autenticación)
app.use('/api/users', userRoutes);

// Aquí puedes proteger rutas que requieran autenticación
// app.use('/api/protected-route', verifyToken, protectedRouteHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
