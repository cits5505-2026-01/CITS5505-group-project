import traceback

from flask import Flask, current_app, redirect, request, url_for
from werkzeug.exceptions import HTTPException
import configs.environment as environment
import configs.database as database
import configs.authentication as authentication
import configs.migration as migration
import configs.view_filter as view_filter
import configs.csrf as csrf
from routes.api import api_bp
from routes.views import views_bp

app = Flask(__name__)

environment.init(app)
database.init(app)
migration.init(app)
authentication.init(app)
view_filter.init(app)
csrf.init(app)

# Register blueprints
app.register_blueprint(api_bp)
app.register_blueprint(views_bp)

# Error handlers
@app.errorhandler(404)
def not_found(e):
    if request.path.startswith('/api/') or request.accept_mimetypes.accept_json:
        return handle_general_exception(e)
    # TODO the error page does not work
    return redirect(url_for('index', _anchor=404))

@app.errorhandler(Exception)
def handle_exception(e):
    return handle_general_exception(e)

def handle_general_exception(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    response = {
        "code": code,
        "message": str(e) if code != 500 else "An internal server error occurred."
    }
    if current_app.debug:
        response["stacktrace"] = traceback.format_exc()
    app.logger.error(e, stack_info=True, exc_info=True)
    return response, code
