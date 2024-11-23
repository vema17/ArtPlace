from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import ENUM

db = SQLAlchemy()

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, nullable=False)
    seller_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    paypal_status = db.Column(ENUM('PENDING', 'COMPLETED', 'FAILED'), default='PENDING')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "product_id": self.product_id,
            "total_amount": float(self.total_amount),
            "paypal_status": self.paypal_status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }


class Seller(db.Model):
    __tablename__ = 'sellers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    paypal_email = db.Column(db.String(100), nullable=False)
    balance = db.Column(db.Numeric(10, 2), default=0.00)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "paypal_email": self.paypal_email,
            "balance": float(self.balance),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }


class Payout(db.Model):
    __tablename__ = 'payouts'
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('sellers.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    payout_batch_id = db.Column(db.String(255), nullable=False)
    payout_status = db.Column(ENUM('PENDING', 'COMPLETED', 'FAILED'), default='PENDING')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "seller_id": self.seller_id,
            "amount": float(self.amount),
            "payout_batch_id": self.payout_batch_id,
            "payout_status": self.payout_status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
