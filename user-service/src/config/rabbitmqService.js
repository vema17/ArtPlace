// rabbitmqService.js
const amqp = require('amqplib');
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL); // Ajusta la URL si es necesario
  channel = await connection.createChannel();
  await channel.assertExchange('marketplace-exchange', 'direct', { durable: true });
  console.log('Conectado a RabbitMQ y configurado el intercambio');
}

async function sendMessageToProduct(message) {
  if (!channel) await connectRabbitMQ();
  channel.publish('marketplace-exchange', 'userToProduct', Buffer.from(JSON.stringify(message)), { persistent: true });
  console.log("Mensaje enviado a usuarios-to-productos:", message);
}

module.exports = { connectRabbitMQ, sendMessageToProduct };
