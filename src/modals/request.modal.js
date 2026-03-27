$(document).ready(() => {
    $('#btn-confirm-create-request').click(() => {
        const formValue = $('#form-create-request').serializeArray()
            .reduce((values, x) => {
                values[x.name] = x.value;
                return values;
            }, {});
        // TODO to create request on backend
        console.log(formValue);
    })
});