from flask import Blueprint, jsonify, request
from database import db
from models import User

# Define the blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    # TODO Manual serialization or use a library like Marshmallow
    return jsonify([{"id": u.id, "name": u.email} for u in users])