const express = require('express');
const ratingRoutes = require('./routes/ratingRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/ratings', ratingRoutes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Servicio de valoraciones escuchando en el puerto ${PORT}`);
});
