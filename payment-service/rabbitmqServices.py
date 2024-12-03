import pika
import json
import time

class RabbitMQ:
    def __init__(self, amqp_url, queue):
        self.amqp_url = amqp_url
        self.queue = queue
        self.connection = None
        self.channel = None

    def connect(self, retries=5, delay=5):
        """Intenta conectar con RabbitMQ con reintentos."""
        params = pika.URLParameters(self.amqp_url)
        for attempt in range(retries):
            try:
                self.connection = pika.BlockingConnection(params)
                self.channel = self.connection.channel()
                self.channel.queue_declare(queue=self.queue, durable=True)
                print("Conexión establecida con RabbitMQ.")
                return
            except pika.exceptions.AMQPConnectionError as e:
                print(f"Intento {attempt + 1} de {retries}: Fallo al conectar. Reintentando en {delay} segundos...")
                time.sleep(delay)
        raise Exception("No se pudo conectar con RabbitMQ después de múltiples intentos.")

    def send_message(self, message):
        """Envía un mensaje a la cola."""
        if not self.channel:
            raise Exception("RabbitMQ channel is not initialized. Call connect() first.")
        self.channel.basic_publish(
            exchange='',
            routing_key=self.queue,
            body=json.dumps(message),
            properties=pika.BasicProperties(delivery_mode=2)  # Persistent messages
        )

    def close(self):
        """Cierra la conexión con RabbitMQ."""
        if self.connection:
            self.connection.close()
