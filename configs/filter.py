
def init(app):
    @app.template_filter('get_initials')
    def get_initials(str):
        return ''.join([s[0].upper() for s in str.strip().split(r' ')[0:2]])