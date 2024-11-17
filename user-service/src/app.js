const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const { connectRabbitMQ, assertQueue} = require('./config/rabbitmqService');

const app = express();
const port = 5000;


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


async function startApp() {
  try {
    console.log('Conectando a RabbitMQ...');
    await connectRabbitMQ();
    await assertQueue('UserToProduct');
    console.log('Conexión a RabbitMQ y cola authToProduct asegurada.');
  } catch (error) {
    console.error('Error al iniciar el servicio:', error);
  }
}

// Rutas protegidas 
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servicio de usuario corriendo en http://localhost:${port}`);
  startApp();
});
