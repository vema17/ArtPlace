import os

class Config:
    MYSQL_HOST = os.getenv('MYSQL_PAYMENT_HOST', 'localhost')
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = os.getenv('MYSQL_PAYMENT_ROOT_PASSWORD', 'rootpassword')
    MYSQL_DB = os.getenv('MYSQL_PAYMENT_DATABASE', 'payment_service')
    MYSQL_PORT = int(os.getenv('MYSQL_PAYMENT_PORT', 3307))
    DEBUG = True

config = Config()
