
$(document).ready(function () {
    const ROUTES = {
        'login': 'login',
        'profile': 'profile',
        'requests': 'requests',
        'dashboard': 'dashboard',
        'dev': 'dev',
        'requests\/\\d+': 'request'
    }
    function loadComponent(elementSelector, componentPath) {
        $(elementSelector).load('src/components/' + componentPath + '.component.html', function (response, status) {
            $.getScript('src/components/' + componentPath + '.component.js');
        });
    }


    function selectComponent(hash) {
        for (let pattern of Object.keys(ROUTES)) {
            let matcher = new RegExp(`^${pattern}$`);
            let match = hash.match(matcher)
            if (match) {
                return ROUTES[pattern];
            }
        }
        return 'home';
    }
    
    function router() {
        const hash = $(location).attr('hash').substring(1) || 'home';
        const page = selectComponent(hash);
        $('main').load('src/pages/' + page + '.page.html', function (response, status) {
            $.getScript('src/pages/' + page + '.page.js');
        });
        $('main').removeClass().addClass(page);
    }

    loadComponent('header', 'header');
    $("footer").load("src/components/footer.component.html");
    $(window).on('hashchange load', router);
});
