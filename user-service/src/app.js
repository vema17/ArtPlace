const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const rabbitmqService = require('./config/rabbitmqService');

const app = express();
const port = 5000;

rabbitmqService.connectRabbitMQ().then(() => {
  rabbitmqService.assertQueue('sessionQueue');
});

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/uploads', express.static('/app/uploads'));

// Ruta para servir el archivo HTML en la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;
  // Lógica de autenticación...
  if (autenticacionExitosa) {
    rabbitmqService.sendMessage('sessionQueue', { userId: usuario.id, sessionStatus: 'active' });
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

// Rutas protegidas 
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servicio de usuario corriendo en http://localhost:${port}`);
});
