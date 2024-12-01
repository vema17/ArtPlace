from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from routes.payment_routes import payment_bp
from config import Config
import paypalrestsdk
from rabbitmqServices import rabbitmq_service 

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)

    # Configurar PayPal dentro del contexto de la aplicación
    with app.app_context():
        paypalrestsdk.configure({
            "mode": app.config['PAYPAL_MODE'],  # 'sandbox' o 'live'
            "client_id": app.config['PAYPAL_CLIENT_ID'],
            "client_secret": app.config['PAYPAL_CLIENT_SECRET'],
        })
    
    # Configurar RabbitMQ
    rabbitmq_service.connect()
    rabbitmq_service.assert_queue('payment_queue')  # Aseguramos la cola de pagos

    # Registrar Blueprints
    app.register_blueprint(payment_bp, url_prefix='/api/payments')

    @app.route("/")
    def home():
        return render_template('proceso_compra.html')

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5002, debug=True)
