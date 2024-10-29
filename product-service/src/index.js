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

// Conectar a RabbitMQ
connectRabbitMQ()
    .then(channel => {
        app.locals.channel = channel;
    })
    .catch(err => console.error('Error connecting to RabbitMQ:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));