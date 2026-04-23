from flask_login import LoginManager
from models import User

login_manager = LoginManager()

def init(app):
    # Set up Flask-Login
    login_manager.init_app(app)
    # This tells Flask-Login how to load a user from the ID stored in the session
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))