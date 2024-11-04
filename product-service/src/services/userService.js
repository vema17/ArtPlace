require('dotenv').config();
const express = require('express');
const connectRabbitMQ = require('./config/rabbitmq');

const app = express();
app.use(express.json());

// Conexión a RabbitMQ
connectRabbitMQ()
  .then((channel) => {
    app.locals.channel = channel;

    // Consumir mensajes de usuarios
    channel.consume('usuarios-to-productos', (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(`Mensaje recibido de usuario: ${messageContent}`);

        // Lógica de procesamiento del mensaje
        // Ejemplo: Enviar una respuesta a RabbitMQ después de procesar el mensaje
        const response = { action: 'acknowledge', result: 'Mensaje procesado' };
        channel.publish('marketplace-exchange', 'productToUser', Buffer.from(JSON.stringify(response)));
        
        channel.ack(msg);
      }
    });
  })
  .catch((err) => console.error('Error connecting to RabbitMQ:', err));