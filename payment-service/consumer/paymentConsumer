import pika

# Conexión al servidor RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declarar la misma cola
channel.queue_declare(queue='ProductToPayment')

# Callback para procesar mensajes
def callback(ch, method, properties, body):
    print(f" [x] Recibido: {body}")

# Consumir mensajes
channel.basic_consume(queue='ProductToPayment', on_message_callback=callback, auto_ack=True)

print(' [*] Esperando mensajes. Presiona Ctrl+C para salir.')
channel.start_consuming()