import pika
import json
import time
import os

class RabbitMQService:
    def __init__(self, rabbitmq_url='amqp://localhost:5672'):
        self.rabbitmq_url = rabbitmq_url
        self.connection = None
        self.channel = None

    def connect(self):
        if self.connection:
            return

        try:
            parameters = pika.URLParameters(self.rabbitmq_url)
            self.connection = pika.BlockingConnection(parameters)
            self.channel = self.connection.channel()
            print('Conectado a RabbitMQ')
        except Exception as e:
            print(f'Error al conectar a RabbitMQ: {e}')
            time.sleep(5)
            self.connect()

    def assert_queue(self, queue_name):
        if not self.channel:
            print('No se pudo asegurar la cola, canal no inicializado')
            return

        try:
            self.channel.queue_declare(queue=queue_name, durable=True)
            print(f'Cola asegurada: {queue_name}')
        except Exception as e:
            print(f'Error al asegurar la cola {queue_name}: {e}')

    def send_message(self, queue_name, message):
        if not self.channel:
            print('No se pudo enviar el mensaje, canal no inicializado')
            return

        try:
            self.channel.basic_publish(
                exchange='',
                routing_key=queue_name,
                body=json.dumps(message),
                properties=pika.BasicProperties(
                    delivery_mode=2,  # Persistent message
                )
            )
            print(f'Mensaje enviado a la cola {queue_name}: {message}')
        except Exception as e:
            print(f'Error al enviar el mensaje: {e}')

    def consume_messages(self, queue_name, callback):
        if not self.channel:
            print('No se pudo consumir mensajes, canal no inicializado')
            return

        try:
            def on_message(channel, method, properties, body):
                message = json.loads(body.decode())
                callback(message)
                channel.basic_ack(delivery_tag=method.delivery_tag)  # Confirmación de mensaje recibido

            self.channel.basic_consume(queue=queue_name, on_message_callback=on_message)
            print(f'Consumiendo mensajes de la cola {queue_name}')
            self.channel.start_consuming()
        except Exception as e:
            print(f'Error al consumir mensajes de la cola {queue_name}: {e}')

# Instancia global
rabbitmq_service = RabbitMQService()