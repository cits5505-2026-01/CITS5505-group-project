from flask_migrate import Migrate
from configs.database import db
# Import models here so Migrate can "see" them
from models import User, UserSkill, Skill, Request, Offer 


def init(app):
    # Set up Flask-Migrate
    Migrate(app, db, render_as_batch=True)
