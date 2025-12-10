from app.view import IndexPage
from flask import Flask

URLS = {
    '/': (IndexPage, 'index'),
}


def set_app_urls(app: Flask):
    for url, (view, view_name) in URLS.items():
        app.add_url_rule(url, view_func=view.as_view(view_name))
