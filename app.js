const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./config/mongodb'); 

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectMongoDB();

// Ruta para servir el archivo HTML en la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rutas protegidas 
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
