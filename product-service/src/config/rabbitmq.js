const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Configuración del exchange y las colas
    await channel.assertExchange('marketplace-exchange', 'direct', { durable: true });
    await channel.assertQueue('usuarios-to-productos', { durable: true });
    await channel.assertQueue('productos-to-usuarios', { durable: true });

    // Enlazamos las colas con el exchange y claves de enrutamiento específicas
    await channel.bindQueue('usuarios-to-productos', 'marketplace-exchange', 'userToProduct');
    await channel.bindQueue('productos-to-usuarios', 'marketplace-exchange', 'productToUser');

    console.log('Conectado a RabbitMQ y configurado correctamente');
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

module.exports = connectRabbitMQ;