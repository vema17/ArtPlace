const amqp = require('amqplib');
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

let currentUserId = null; // Variable para almacenar el ID del usuario actual

async function connectAndConsume() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    // Asegura la cola y el intercambio, y realiza la vinculación
    await channel.assertExchange('marketplace-exchange', 'direct', { durable: true });
    await channel.assertQueue('usuarios-to-productos', { durable: true });
    await channel.bindQueue('usuarios-to-productos', 'marketplace-exchange', 'userToProduct');
    
    console.log('Consumiendo mensajes de usuarios-to-productos');
    
    // Consume mensajes de la cola `usuarios-to-productos`
    channel.consume('usuarios-to-productos', (msg) => {
        if (msg) {
            const message = JSON.parse(msg.content.toString());
            if (message.action === 'user_login') {
                currentUserId = message.userId;
                console.log(`User ID ${currentUserId} almacenado en el consumidor de productos.`);
            }
            channel.ack(msg);
        }
    });
}

module.exports = {
    connectAndConsume,
    getCurrentUserId: () => currentUserId
};
