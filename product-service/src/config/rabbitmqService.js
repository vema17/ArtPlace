// rabbitmqService.js
const amqp = require('amqplib');
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

let connection;
let channel;

async function connectRabbitMQ() {
  if (connection) return;

  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Conectado a RabbitMQ');
  } catch (error) {
    console.error('Error al conectar a RabbitMQ2:', error);
    setTimeout(connectRabbitMQ, 5000); 
  }
}

async function assertQueue(queueName) {
  if (!channel) {
    console.error('No se pudo asegurar la cola, canal no inicializado');
    return;
  }

  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Cola asegurada: ${queueName}`);
  } catch (error) {
    console.error(`Error al asegurar la cola ${queueName}:`, error);
  }
}

async function sendMessage(queueName, message) {
  if (!channel) {
    console.error('No se pudo enviar el mensaje, canal no inicializado');
    return;
  }

  try {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Mensaje enviado a la cola ${queueName}:`, message);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}

async function consumeMessages(queueName, callback) {
  if (!channel) {
    console.error('No se pudo consumir mensajes, canal no inicializado');
    return;
  }

  try {
    await channel.consume(queueName, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        callback(message);
        channel.ack(msg); // Confirmación de mensaje recibido
      }
    });
    console.log(`Consumiendo mensajes de la cola ${queueName}`);
  } catch (error) {
    console.error(`Error al consumir mensajes de la cola ${queueName}:`, error);
  }
}

module.exports = {
  connectRabbitMQ,
  assertQueue,
  sendMessage,
  consumeMessages,
};
