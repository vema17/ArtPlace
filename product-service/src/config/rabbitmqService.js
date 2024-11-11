const amqp = require('amqplib');
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

let connection;
let channel;

async function connectRabbitMQ() {
    // Conecta a RabbitMQ y crea un canal
    connection = await amqp.connect(RABBITMQ_URL); // Ajusta la URL si es necesario
    channel = await connection.createChannel();
    
    // Asegura el intercambio
    await channel.assertExchange('marketplace-exchange', 'direct', { durable: true });
    console.log('Conectado a RabbitMQ y configurado el intercambio en el microservicio de productos');
}

async function assertQueueAndBind(queueName, routingKey) {
    // Asegura la cola y la vincula al intercambio con la clave de enrutamiento
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, 'marketplace-exchange', routingKey);
    console.log(`Cola ${queueName} asegurada y vinculada con la clave ${routingKey}`);
}

async function consumeMessages(queueName, callback) {
    if (!channel) await connectRabbitMQ();
    
    await assertQueueAndBind(queueName, 'userToProduct'); // Vincula la cola con la clave de enrutamiento
    
    channel.consume(queueName, (msg) => {
        if (msg) {
            const message = JSON.parse(msg.content.toString());
            callback(message); // Llama al callback para manejar el mensaje
            channel.ack(msg); // Confirma que el mensaje ha sido recibido
        }
    });
    console.log(`Consumiendo mensajes de la cola ${queueName}`);
}

module.exports = { connectRabbitMQ, consumeMessages };
