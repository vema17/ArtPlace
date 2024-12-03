from models.model import db, Transaction, Seller, Payout
import paypalrestsdk


def create_transaction(data):
    transaction = Transaction(
        buyer_id=data['buyer_id'],
        seller_id=data['seller_id'],
        product_id=data['product_id'],
        total_amount=data['total_amount']
    )
    db.session.add(transaction)
    db.session.commit()
    return transaction.serialize()


def get_transactions():
    transactions = Transaction.query.all()
    return [transaction.serialize() for transaction in transactions]


def process_payout(data):
    seller = Seller.query.get(data['seller_id'])
    if not seller or seller.balance < data['amount']:
        return {"error": "Saldo insuficiente o vendedor no encontrado"}

    payout = paypalrestsdk.Payout({
        "sender_batch_header": {
            "sender_batch_id": "batch_{}".format(seller.id),
            "email_subject": "Payout from Marketplace"
        },
        "items": [{
            "recipient_type": "EMAIL",
            "amount": {
                "value": str(data['amount']),
                "currency": "USD"
            },
            "receiver": seller.paypal_email,
            "note": "Gracias por tu servicio.",
            "sender_item_id": str(seller.id)
        }]
    })

    if payout.create():
        payout_record = Payout(
            seller_id=seller.id,
            amount=data['amount'],
            payout_batch_id=payout.batch_header.payout_batch_id,
            payout_status="COMPLETED"
        )
        seller.balance -= data['amount']
        db.session.add(payout_record)
        db.session.commit()
        return payout_record.serialize()
    else:
        return {"error": payout.error}
