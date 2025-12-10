from flask.views import MethodView
from flask import render_template

class IndexPage(MethodView):
    def get(self):
        return render_template('pages/index.html')
