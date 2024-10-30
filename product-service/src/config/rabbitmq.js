const amqp = require('amqplib');

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        // Declarar un intercambio para comunicación general
        const exchange = 'servicios_intercambio';
        await channel.assertExchange(exchange, 'direct', { durable: true });

        // Configuración de cola
        const queue = 'cola_productos';
        await channel.assertQueue(queue, { durable: true });

        // Enlazar la cola al intercambio
        channel.bindQueue(queue, exchange, 'productos');

        console.log('Conectado a RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Error conectando a RabbitMQ:', error);
        throw error;
    }
}

module.exports = connectRabbitMQ;
