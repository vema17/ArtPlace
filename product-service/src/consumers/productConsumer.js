const amqp = require('amqplib/callback_api');
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const QUEUE_NAME = 'UserToProduct';

let connection = null;
let channel = null;

let currentUser = {
    id: null,
    nombre: null,
    token: null,
}

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
                if (message.action === 'user_login' && message.userId && message.nombre && message.token) {
                    currentUser.id = message.userId;
                    currentUser.nombre = message.nombre;
                    currentUser.token = message.token;
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
    if (!currentUser.id) {
      console.warn('No hay un User ID almacenado actualmente.');
      return null;
    }
    return currentUser.id;
  }

/**
 * Devuelve el token del usuario actual.
 * @returns {string|null} - El token del usuario actual o `null` si no está definido.
 */
function getCurrentUserToken() {
    if (!currentUser.token) {
      console.warn('No hay un token almacenado actualmente.');
      return null;
    }
    return currentUser.token;
}
  
  /**
   * Devuelve el nombre del usuario actual.
   * @returns {string|null} - El nombre del usuario actual o `null` si no está definido.
   */
  function getCurrentUserName() {
    if (!currentUser.nombre) {
      console.warn('No hay un nombre de usuario almacenado actualmente.');
      return null;
    }
    return currentUser.nombre;
}

// Iniciar conexión a RabbitMQ
connectToRabbitMQ();

module.exports = {
    getCurrentUserId,
    getCurrentUserToken,
    getCurrentUserName,
};
