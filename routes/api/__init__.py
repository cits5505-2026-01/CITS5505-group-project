from flask import Blueprint
from routes.api.users import users_bp
from routes.api.requests import requests_bp

# Define the blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')
api_bp.register_blueprint(users_bp)
api_bp.register_blueprint(requests_bp)