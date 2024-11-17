const amqp = require('amqplib/callback_api');
let currentUserId = null; // Variable para almacenar el ID del usuario actual
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const QUEUE_NAME = 'authToProduct';
let connection = null;
let channel = null;

/**
 * Conecta a RabbitMQ y configura el consumidor.
 */
function connectToRabbitMQ() {
    amqp.connect(RABBITMQ_URL, (error0, conn) => {
        if (error0) {
            console.error('Error al conectar a RabbitMQ:', error0.message);
            setTimeout(connectToRabbitMQ, 5000); // Reintentar conexión en 5 segundos
            return;
        }
        console.log('Conexión exitosa a RabbitMQ');
        connection = conn;

        // Manejo de eventos para reconexión
        connection.on('error', (err) => {
            console.error('Error en la conexión de RabbitMQ:', err.message);
            connection = null;
            setTimeout(connectToRabbitMQ, 5000);
        });

        connection.on('close', () => {
            console.warn('Conexión a RabbitMQ cerrada. Reintentando...');
            connection = null;
            setTimeout(connectToRabbitMQ, 5000);
        });

        setupChannel();
    });
}

/**
 * Configura el canal y asegura la cola.
 */
function setupChannel() {
    if (!connection) {
        console.error('Conexión no inicializada. Intentando reconectar...');
        return;
    }

    connection.createChannel((error1, ch) => {
        if (error1) {
            console.error('Error al crear el canal de RabbitMQ:', error1.message);
            setTimeout(setupChannel, 5000);
            return;
        }

        console.log('Canal de RabbitMQ creado con éxito');
        channel = ch;

        channel.assertQueue(QUEUE_NAME, { durable: false }, (error2) => {
            if (error2) {
                console.error(`Error al asegurar la cola ${QUEUE_NAME}:`, error2.message);
                return;
            }

            console.log(`Esperando mensajes en ${QUEUE_NAME}...`);
            startConsuming();
        });
    });
}

/**
 * Inicia el consumo de mensajes en la cola.
 */
function startConsuming() {
    if (!channel) {
        console.error('El canal de RabbitMQ no está disponible para consumir mensajes.');
        return;
    }

    channel.consume(
        QUEUE_NAME,
        (msg) => {
            try {
                const message = JSON.parse(msg.content.toString());
                console.log('Mensaje recibido:', message);

                // Manejar el mensaje
                if (message.action === 'user_login' && message.userId) {
                    currentUserId = message.userId; // Actualizar el ID del usuario actual
                    console.log(`User ID ${message.userId} almacenado en el consumidor.`);
                } else {
                    console.warn('Mensaje recibido pero no válido:', message);
                }
            } catch (error) {
                console.error('Error al procesar el mensaje:', error.message);
            }
        },
        { noAck: true } // No se requiere confirmación de mensaje
    );
}

/**
 * Devuelve el ID del usuario actual.
 * @returns {string|null} - El ID del usuario actual o `null` si no está definido.
 */
function getCurrentUserId() {
    if (!currentUserId) {
        console.warn('No hay un User ID almacenado actualmente.');
        return null;
    }
    return currentUserId;
}

// Iniciar conexión a RabbitMQ
connectToRabbitMQ();

module.exports = {
    getCurrentUserId,
};
