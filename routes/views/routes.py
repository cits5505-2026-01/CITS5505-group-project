from flask import Blueprint, redirect, render_template, request, url_for
from routes.views.requests import requests_bp

# Define the blueprint
views_bp = Blueprint('views', __name__, url_prefix='/')
views_bp.register_blueprint(requests_bp)

# API to serve the frontend
@views_bp.route("/")
@views_bp.route("/index.html")
def index():
    return render_template('index.html')

def render_fragment(section, name):
    return render_template(f"{section}/{name}.{section[:-1]}.html")


@views_bp.route("/pages/<name>")
@views_bp.route("/components/<name>")
@views_bp.route("/modals/<name>")
def render_section(name):
    section = request.path.strip("/").split("/", 1)[0]
    return render_fragment(section, name)

@views_bp.route("/<page>")
def subpage(page):
    return redirect(url_for('index', _anchor=page))

