const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML en la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(port, () => {
  console.log(`Pagina principal corriendo en http://localhost:${port}`);
}); 