const { consumeMessages } = require('../config/rabbitmqService');

let currentUserId = null; // Variable para almacenar el ID del usuario actual

function handleUserLogin(message) {
    if (message.action === 'user_login' && message.userId) {
        currentUserId = message.userId;
        console.log(`User ID ${currentUserId} almacenado en el consumidor de productos.`);
    } else {
        console.log("Mensaje inválido o faltan campos necesarios:", message);
    }
}

async function startConsuming() {
    try {
        await consumeMessages('usuarios-to-productos', handleUserLogin); // Consume mensajes desde la cola configurada
        console.log('Consumo iniciado en la cola usuarios-to-productos');
    } catch (error) {
        console.error('Error al iniciar el consumo de mensajes:', error);
    }
}

module.exports = {
    startConsuming,
    getCurrentUserId: () => currentUserId
};
