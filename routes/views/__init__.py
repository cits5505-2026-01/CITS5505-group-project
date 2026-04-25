from flask import Blueprint, redirect, render_template, request, url_for
from routes.views.requests import requests_bp

# Define the blueprint
views_bp = Blueprint('views', __name__, url_prefix='/')
views_bp.register_blueprint(requests_bp)

# API to serve the frontend
@views_bp.route("/")
@views_bp.route("/index.html")
def index():
    return render_template_with_class('home')

@views_bp.route('/dashboard')
def dashboard():
    return render_template_with_class('dashboard', has_js = False)

@views_bp.route('/dev')
def dev():
    return render_template_with_class('dev')

@views_bp.route('/login')
@views_bp.route('/register')
def login():
    return render_template_with_class('login', has_js = False)

@views_bp.route('/profile')
def profile():
    return render_template_with_class('profile', has_js=False)


def render_template_with_class(page, has_css = True, has_js = True):
    return render_template(f'pages/{page}.page.html',
                           css_file=f'/css/pages/{page}.page.css' if has_css else Non,
                           js_file=f'/js/pages/{page}.page.js' if has_js else None,
                           main_class=page)


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

