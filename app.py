from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

# TODO to generalize the methods below, we can use a single route with a parameter to determine which template to render. For example:
@app.route("/pages/<page>")
def fetchPage(page):
    return render_template(f'pages/{page}.page.html')

@app.route("/components/<component>")
def fetchComponent(component):
    return render_template(f'components/{component}.component.html')

@app.route("/modals/<modal>")
def fetchModal(modal):
    return render_template(f'modals/{modal}.modal.html')

# TODO Handle unexpected errors
if __name__ == "__main__":
    # In 2026, 'debug=True' is still your best friend for development
    app.run(debug=True)