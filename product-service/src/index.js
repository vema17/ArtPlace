require('dotenv').config();
const express = require('express');
const path = require('path');
const connectMongoDB = require('./config/mongodb'); 
const connectRabbitMQ = require('./config/rabbitmq');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB
connectMongoDB();

// Configurar las rutas de productos
app.use('/uploads', express.static('/app/uploads'));
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search_products.html'));
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