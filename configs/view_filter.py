
def init(app):
    @app.template_filter('get_initials')
    def get_initials(name):
        return ''.join([s[0].upper() for s in name.strip().split(r' ')[0:2]])
