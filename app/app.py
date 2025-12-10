from app.urls import set_app_urls
from flask import Flask

app = Flask(__name__)
set_app_urls(app)

app.debug = True