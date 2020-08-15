import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'

export default {
    get: {
        dashboard(context) {

            models.trek.getAll().then((response) => {

                const treks = response.docs.map(docModifier);

                context.treks = treks;

                extend(context).then(function () {
                    this.partial('../views/trek/dashboard.hbs')
                })
            })
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/trek/create.hbs')
            })
        },
        details(context) {
            const { trekId } = context.params;

            models.trek.get(trekId)
            .then((response) => {

                const trek = docModifier(response);

                Object.keys(trek).forEach((key) => {
                    context[key] = trek[key];
                });

                // context.canDonate = trek.uid !== localStorage.getItem('userId');
                context.canEdit = trek.uid === localStorage.getItem('userId');
                context.organizer = localStorage.getItem("userEmail");

                extend(context).then(function() {
                    this.partial('../views/trek/details.hbs');
                });
            })
            .catch((e) => console.error(e))
        },
        edit(context) {
            const { trekId } = context.params;

            models.trek.get(trekId)
            .then((response) => {

                const trek = docModifier(response);

                Object.keys(trek).forEach((key) => {
                    context[key] = trek[key];
                });

                context.canEdit = trek.uid === localStorage.getItem('userId');

                extend(context).then(function() {
                    this.partial('../views/trek/edit.hbs');
                });
            })
            .catch((e) => console.error(e))
        }
    },
    post: {
        create(context) {

            const data = {
                ...context.params, 
                uid: localStorage.getItem('userId'),
                likes: 0,
                createdByName: localStorage.getItem('userEmail')
            };

            models.trek.create(data)
                .then((response) => {
                    console.log(response)
                    context.redirect('#/trek/dashboard');
                })
                .catch((e) => console.error(e));
        }, 
        dashboard(context) {
            console.log(context.params)
        }
    },
    del: {
        close(context) {
            const { trekId } = context.params;

            models.trek.close(trekId)
            .then(((response) => {
                context.redirect('#/trek/dashboard')
            }))
        }
    },
    put: {
        donate(context) {
            const { trekId, currentDonation } = context.params;

            models.trek.get(trekId).then((response) => {
                const trek = docModifier(response);

                trek.collectedFunds += Number(currentDonation);
                trek.donors.push(localStorage.getItem('userEmail'));

                return models.trek.donate(trekId, trek)
            })
            .then((response) => {
                context.redirect('#/trek/dashboard')
            })
        },
        edit(context) {
            const { trekId } = context.params;

            models.trek.get(trekId).then((response) => {
                const trek = docModifier(response);

                trek.location = context.params.location;
                trek.dateTime = context.params.dateTime;
                trek.description = context.params.description;
                trek.imageURL = context.params.imageURL;

                return models.trek.update(trekId, trek);
            })
            .then((resp) => {
                context.redirect(`#/trek/details/${trekId}`)
            })
            .catch((e) => console.error(e))
        },
        like(context) {
            const { trekId, currentDonation } = context.params;

            models.trek.get(trekId).then((response) => {
                const trek = docModifier(response);

                trek.likes += 1;

                return models.trek.update(trekId, trek)
            })
            .then((response) => {
                context.redirect(`#/trek/details/${trekId}`);
            })
        }
    }
};