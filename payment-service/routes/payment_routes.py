from flask import Blueprint, jsonify

# Crear un Blueprint para las rutas de pagos
payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"message": "Payment service is running"}), 200
