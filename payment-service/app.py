from flask import Flask
from routes.payment_routes import payment_bp
import config
import paypalrestsdk
import os

app = Flask(__name__)
app.config.from_object(config)

# Registrar rutas
app.register_blueprint(payment_bp, url_prefix='/api/payments')

@app.route("/")
def home():
    return {"message": "Microservicio de Pago funcionando"}



# Configuración de PayPal
paypalrestsdk.configure({
    "mode": os.getenv("PAYPAL_MODE", "sandbox"),  # 'sandbox' o 'live'
    "client_id": os.getenv("PAYPAL_CLIENT_ID"),
    "client_secret": os.getenv("PAYPAL_CLIENT_SECRET"),
})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
