from flask import Blueprint, request, jsonify
from services.payment_services import create_transaction, get_transactions, process_payout

# Crear un Blueprint para las rutas de pagos
payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"message": "Payment service is running"}), 200

@payment_bp.route('/create', methods=['POST'])
def create():
    data = request.json
    response = create_transaction(
        buyer_id=data.get('buyer_id'),
        seller_id=data.get('seller_id'),
        product_id=data.get('product_id'),
        total_amount=data.get('total_amount')
    )
    return jsonify(response)

@payment_bp.route('/transactions/<int:user_id>', methods=['GET'])
def transactions(user_id):
    response = get_transactions(user_id)
    return jsonify(response)

@payment_bp.route('/payout', methods=['POST'])
def payout():
    data = request.json
    response = process_payout(
        seller_id=data.get('seller_id'),
        amount=data.get('amount')
    )
    return jsonify(response)