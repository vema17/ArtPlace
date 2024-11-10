// src/consumers/productConsumer.js
const { consumeMessages } = require('../config/rabbitmqService');

let currentUserId = null; // Variable para almacenar el ID del usuario

// Función para manejar los mensajes de inicio de sesión
function handleUserLogin(message) {
    if (message.action === 'user_login') {
        currentUserId = message.userId;
        console.log(`User ID ${message.userId} almacenado en el consumidor.`);
    }
}

// Inicia el consumo de mensajes de la cola 'authToProduct'
async function startConsuming() {
    try {
        await consumeMessages('authToProduct', handleUserLogin);
        console.log('Consumo iniciado en la cola authToProduct');
    } catch (error) {
        console.error('Error al iniciar el consumo de mensajes:', error);
    }
}

module.exports = {
    startConsuming,
    getCurrentUserId: () => currentUserId, // Exporta el ID del usuario actual
};
