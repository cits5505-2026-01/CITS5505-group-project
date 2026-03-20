$(document).ready(function () {
    const request = {
        id: 1234,
        owner: {
            id: 5123,
            name: 'John Doe'
        },
        skill: {
            name: 'Guitar',
            category: {
                name: 'Music'
            }
        },
        description: 'Description',
        level: 'BEGINNER',
        status: 'REQUESTED',
        offers: [
            {
                id: 1234,
                offerer: {
                    user: 'John Doe II',
                    level: 'BEGINNER',
                    skill: {
                        name: 'Drawing',
                        category: {
                            name: 'Art'
                        }
                    }
                }
            },
            {
                id: 1234,
                offerer: {
                    user: 'John Doe III',
                    level: 'BEGINNER',
                    skill: {
                        name: 'Running',
                        category: {
                            name: 'Sport'
                        }
                    }
                }
            },
        ],
        createdAt: new Date() - 30
    };

    fillDataValue('#request', request);

    $.get('src/components/offer.component.html').then(offerHtml => {
        request.offers.forEach((offer) => {
            $('#offers').append(fillDataValue(offerHtml, offer.offerer));
        });
    });

    function fetchData(obj, path) {
        if (path.length === 0 || typeof(obj) !== typeof({})) {
            return obj;
        }
        const [field, ...rest] = path;
        return fetchData(obj[field], rest);
    }

    function fillDataValue(elementHtml, obj) {
        const element = $(elementHtml);
        element.find('[app-data-value]').get().forEach(element => {
            const value = fetchData(obj, $(element).attr('app-data-value').split('.'));
            $(element).text(value);
        });
        element.find('[app-attr-value]').get().forEach(childElement => {
            const appAttrValue = $(childElement).attr('app-attr-value').split(',');
            appAttrValue.forEach(attrName => {
                $(childElement).attr(attrName, format($(childElement).attr(attrName), obj));
            });
        })
        return element;
    }

    function format(template, data) {
        return template.replace(/{{([^}]+)}}/g, (match, key) => {
            return fetchData(data, key.split('.'));
        });
    }
})