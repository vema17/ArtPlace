from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from routes.payment_routes import payment_bp
from config import Config
import paypalrestsdk
from rabbitmqServices import RabbitMQ


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    
    # Configuración de RabbitMQ
    RABBITMQ_URL = "amqp://guest:guest@rabbitmq:5672"
    QUEUE_NAME = "my_queue"

    # Crear una instancia de RabbitMQ
    rabbitmq = RabbitMQ(RABBITMQ_URL, QUEUE_NAME)
    
    rabbitmq.connect()
    rabbitmq.send_message({"message": "Hello, RabbitMQ!"})
    print("Mensaje enviado con éxito.")

    # Configurar PayPal dentro del contexto de la aplicación
    with app.app_context():
        paypalrestsdk.configure({
            "mode": app.config['PAYPAL_MODE'],  # 'sandbox' o 'live'
            "client_id": app.config['PAYPAL_CLIENT_ID'],
            "client_secret": app.config['PAYPAL_CLIENT_SECRET'],
        })

    # Registrar Blueprints
    app.register_blueprint(payment_bp, url_prefix='/api/payments')

    @app.route("/")
    def home():
        return render_template('proceso_compra.html')

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5002, debug=True)
