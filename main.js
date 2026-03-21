
$(document).ready(function () {
    function loadComponent(elementSelector, componentPath) {
        $(elementSelector).load('src/components/' + componentPath + '.component.html', function (response, status) {
            $.getScript('src/components/' + componentPath + '.component.js');
        });
    }
    
    function router() {
        const hash = $(location).attr('hash').substring(1) || 'home';
        const page = hash || '404';
        $('main').load('src/pages/' + hash + '.page.html', function (response, status) {
            $.getScript('src/pages/' + hash + '.page.js');
        });
        $('main').removeClass().addClass(page);
    }

    loadComponent('header', 'header');
    $("footer").load("src/components/footer.component.html");
    $(window).on('hashchange load', router);
});

function showModal(modalName, callback) {
    $.get(`src/modals/${modalName}.modal.html`).then((response) => {
        const modalElement = $(response);
        if (callback) {
            modalElement.on('hide.bs.modal', callback);
        }
        modalElement.on('shown.bs.modal', () => {
            $.getScript(`src/modals/${modalName}.modal.js`);
        });
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
    });
}