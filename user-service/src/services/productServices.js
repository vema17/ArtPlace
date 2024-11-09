// userService.js
require('dotenv').config();
const express = require('express');
const connectRabbitMQ = require('./config/rabbitmq');

const app = express();
app.use(express.json());

// Conexión a RabbitMQ
connectRabbitMQ()
  .then((channel) => {
    app.locals.channel = channel;

    // Función para enviar mensajes a productos desde el usuario
    app.post('/notify-product', (req, res) => {
      const { action, data } = req.body;  // Ejemplo: { action: 'update_profile', data: { userId, ... } }
      const message = JSON.stringify({ action, data });

      // Publicar mensaje en el exchange con clave de enrutamiento 'userToProduct'
      channel.publish('marketplace-exchange', 'userToProduct', Buffer.from(message));
      console.log(`Mensaje enviado a productos: ${message}`);
      res.status(200).json({ message: 'Notificación enviada a productos' });
    });

    // Consumir mensajes de productos
    channel.consume('productos-to-usuarios', (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(`Mensaje recibido de productos: ${messageContent}`);
        channel.ack(msg);
      }
    });
  })
  .catch((err) => console.error('Error connecting to RabbitMQ:', err));
