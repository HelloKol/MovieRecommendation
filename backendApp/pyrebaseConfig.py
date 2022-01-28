import pyrebase
import os
from dotenv import load_dotenv
load_dotenv()

config = {
    "apiKey": os.getenv('BACKEND_DB_API'),
    "authDomain": os.getenv('BACKEND_AUTH_DOMAIN'),
    "databaseURL": os.getenv('BACKEND_DATABASE_URL'),
    "storageBucket": "movieapp-507a4.appspot.com",
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()