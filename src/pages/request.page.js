import { RequestModal } from "../modals/request.modal.js";
import { OfferModal } from "../modals/offer.modal.js";
import { service } from "../services/data.service.js";
class RequestPage {
    constructor(container, params) {
        this.container = container;
        this.params = params;
        this.request = null;
    }

    async render() {
        this.request = await service.findRequestById(Number(this.params.requestId));
        if (!this.request) {
            window.location.hash = '404';
            return;
        }

        this.container.html(await this.template())  ;
        this.onInit();
    }

    onInit() {
        service.fillDataValue('.request', {
            request: this.request
        });

        $("#offering-skills").html(
            this.request.offering.skills.map(skill => $('<div></div>').addClass('skill-chip').text(skill.name))
        );

        $(".request-status").addClass(`status-${this.request.status.toLowerCase()}`)

        $.get('src/components/offer.component.html').then(offerHtml => {
            this.request.offers.forEach((offer) => {
                const offerer = offer.offerer;
                $('#offers').append(service.fillDataValue(offerHtml, offerer));
            });
        });

        $("#btn-edit-request").click(() => {
            const requestModal = new RequestModal((data) => {
                console.log(data);
            });
            requestModal.show(this.request);
        });

        $("#btn-offer").click(() => {
            const offerModal = new OfferModal((data) => {
                console.log(data);
            });
            offerModal.show(this.request);
        });

    }

    template() {
        return $.get(`src/pages/request.page.html`);
    }
}

export const Page = RequestPage;