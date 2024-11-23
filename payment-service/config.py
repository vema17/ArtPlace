import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:rootpassword@payment-mysql:3306/payment_service'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PAYPAL_MODE = os.getenv('PAYPAL_MODE', 'sandbox')  # Cambia a 'live' en producción
    PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID', 'your-client-id')
    PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET', 'your-client-secret')

config = Config()
