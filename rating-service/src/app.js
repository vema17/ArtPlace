const express = require('express');
const bodyParser = require('body-parser');
const ratingRoutes = require('./routes/ratingRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/ratings', ratingRoutes);


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Servicio de valoraciones escuchando en el puerto ${PORT}`);
});
