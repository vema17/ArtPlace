// productConsumer.js
const { consumeMessages } = require('../config/rabbitmqService');

// Función para manejar los mensajes recibidos
function handleUserLogin(message) {
    if (message.action === 'user_login') {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userId', message.userId);
            console.log(`User ID ${message.userId} almacenado en localStorage.`);
        } else {
            console.log(`User ID ${message.userId} recibido en el servidor.`);
        }
    }
}

// Consumir mensajes de la cola 'authToProduct'
async function startConsuming() {
    await consumeMessages('authToProduct', handleUserLogin);
}

module.exports = {
    startConsuming,
};
