$(document).ready(function () {
    // Login logic
    function updateHeader() {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            $('#header-non-user-group').addClass('d-none').hide();
            $('#header-user-group').removeClass('d-none').show();
        } else {
            $('#header-non-user-group').removeClass('d-none').show();
            $('#header-user-group').addClass('d-none').hide();
        }

        const hash = $(location).attr('hash').substring(1) || 'home';
        $('.navbar .nav-link').removeClass('active');
        $('.navbar .nav-link-' + hash).addClass('active')
    }

    $('#btn-logout').click(function () {
        sessionStorage.setItem('isLoggedIn', 'false');
        window.location.hash = '#home';
    });

    $('#btn-create-request').click(function () {
        showModal('request', (event) => {
            location.reload(); // TODO navigate to request detail page after creation
        });
    });

    $(window).on('hashchange load', updateHeader);
    updateHeader();
});