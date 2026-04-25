# CITS5505-group-project
Group project for CITS5505 Semester 1 - 2026
## Description
This project is a Flask web application for a peer-to-peer skill sharing platform. Users can create profiles, list their skills, create learning requests, and make offers on requests from other users. The backend uses Flask, SQLAlchemy, Marshmallow, and Flask-Migrate, while the frontend is served with Jinja templates and reusable page/component/modal fragments.

## Members
| UWA ID | Name | Github username |
| -------| -----| ----------------|
| 25112977 | Han Minh Tran | hanminh1203|
| 24112045 | Zihan Jia | misuchii |
| 24350939 | Jianing Wang | zhazha-1004 |

## How to launch
1. Create a Python virtual environment.

Windows (PowerShell):

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

macOS / Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install the dependencies:

```bash
pip install -r requirements.txt
```

3. Optional: create a `.env` file in the project root to override configuration values. Example:

```env
SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False
FLASK_DEBUG=False
WTF_CSRF_SECRET_KEY=$DEFINE-YOUR-OWN-KEY$
SECRET_KEY=$DEFINE-YOUR-OWN-KEY$
```

4. Apply the database migration:

```bash
flask db upgrade
```

5. Optional: seed the database with dummy data:

```bash
python dummy.py
```

6. Start the Flask application:

```bash
flask --app app run
```

7. Open the app in your browser:

```text
http://127.0.0.1:5000
```

Useful routes:
- `/` or `/index.html` for the main app shell
- `/api/users/` for the users API
- `/api/requests/` for the requests API

## How to run the tests
There are currently no automated tests configured in this repository.
