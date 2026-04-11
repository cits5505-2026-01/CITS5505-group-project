import { HeaderComponent } from './components/header.component.js';
$(document).ready(function () {
    const ROUTES = {
        'login': {page: 'login', js: false},
        'profile': {page: 'profile', js: false},
        'requests': {page: 'requests', js: false},
        'dashboard': {page: 'dashboard', js: false},
        'dev': {page: 'dev', js: false},
        'home': {page: 'home', js: false},
        'requests\/(?<requestId>\\d+)': {page: 'request', js: true}
    }

    const headerComponent = new HeaderComponent($('header'));
    headerComponent.render();
    $("footer").load("components/footer");
    $(window).on('hashchange load', router);


    function selectComponent(hash) {
        for (let pattern of Object.keys(ROUTES)) {
            let matcher = new RegExp(`^${pattern}$`);
            let match = hash.match(matcher)
            if (match) {
                return {
                    route: ROUTES[pattern],
                    params: match.groups
                };
            }
        }
        return {
            route: ROUTES['home'],
        };
    }
    
    function router() {
        const hash = $(location).attr('hash').substring(1) || 'home';
        const routeInfo = selectComponent(hash);
        const page = routeInfo.route.page;
        if (routeInfo.route.js) {
            import(`./pages/${page}.page.js`).then((module) => {
                const pageComponent = new module.Page($('main'), routeInfo.params);
                pageComponent.render();
            });
        } else {
            $('main').load(`pages/${page}`, function (response, status) {
                $.getScript('static/js/pages/' + page + '.page.js');
            });
        }
        $('main').removeClass().addClass(page);
        
        headerComponent.updateActiveLink(routeInfo);
        headerComponent.updateHeader();
    }


});