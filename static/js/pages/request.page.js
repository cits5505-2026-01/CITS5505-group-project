import { RequestModal } from "../modals/request.modal.js";
import { service } from "../services/data.service.js";
class RequestPage {
    constructor(container, params) {
        this.container = container;
        this.params = params;
        this.request = null;
    }

    async render() {
        this.container.html(await this.template())  ;
        this.onInit();
    }

    onInit() {
        $("#btn-edit-request").click(() => {
            const requestModal = new RequestModal((data) => {
                console.log(data);
            });
            requestModal.show(this.request);
        })
    }

    template() {
        return $.get(`requests/${Number(this.params.requestId)}`);
    }
}

export const Page = RequestPage;