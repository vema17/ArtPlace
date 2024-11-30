const express = require('express');
const bodyParser = require('body-parser');
const ratingRoutes = require('./routes/ratingRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/ratings', ratingRoutes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Servicio de valoraciones escuchando en el puerto ${PORT}`);
});
