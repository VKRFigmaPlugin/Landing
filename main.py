import os

from flask import Flask

from app.urls import set_app_urls


app = Flask(__name__, template_folder="app/templates", static_folder="app/static")
set_app_urls(app)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 80))
    app.run(host="0.0.0.0", port=port, debug=False)
