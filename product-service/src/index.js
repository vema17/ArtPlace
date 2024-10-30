require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/mongodb'); 
const connectRabbitMQ = require('./config/rabbitmq');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Conectar a MongoDB
connectMongoDB();

// Configurar las rutas de productos
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Servidor en funcionamiento');
  });

// Conectar a RabbitMQ
connectRabbitMQ()
    .then(channel => {
        app.locals.channel = channel;
    })
    .catch(err => console.error('Error connecting to RabbitMQ:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servicio de productos corriendo en ${PORT}`));