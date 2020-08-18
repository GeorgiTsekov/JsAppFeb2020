import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'

export default {
    get: {
        dashboard(context) {

            models.shoe.getAll().then((response) => {

                const shoes = response.docs.map(docModifier);

                context.shoes = shoes;

                extend(context).then(function () {
                    this.partial('../views/shoe/dashboard.hbs')
                })
            })
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/shoe/create.hbs')
            })
        },
        details(context) {
            const { shoeId } = context.params;

            models.shoe.get(shoeId)
            .then((response) => {

                const shoe = docModifier(response);

                Object.keys(shoe).forEach((key) => {
                    context[key] = shoe[key];
                });

                // context.canDonate = shoe.uid !== localStorage.getItem('userId');
                context.canEdit = shoe.uid === localStorage.getItem('userId');
                context.isCurrentUserBouthIt = shoe.usersBouthShoes.includes(localStorage.getItem("userEmail"));

                extend(context).then(function() {
                    this.partial('../views/shoe/details.hbs');
                });
            })
            .catch((e) => console.error(e))
        },
        edit(context) {
            const { shoeId } = context.params;

            models.shoe.get(shoeId)
            .then((response) => {

                const shoe = docModifier(response);

                Object.keys(shoe).forEach((key) => {
                    context[key] = shoe[key];
                });

                context.canEdit = shoe.uid === localStorage.getItem('userId');

                extend(context).then(function() {
                    this.partial('../views/shoe/edit.hbs');
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
                buyers: 0,
                creator: localStorage.getItem('userEmail'),
                usersBouthShoes: []
            };

            models.shoe.create(data)
                .then((response) => {
                    console.log(response)
                    context.redirect('#/shoe/dashboard');
                })
                .catch((e) => console.error(e));
        }
        , dashboard(context) {
            console.log(context.params)
        }
    },
    del: {
        close(context) {
            const { shoeId } = context.params;

            models.shoe.close(shoeId)
            .then(((response) => {
                context.redirect('#/shoe/dashboard')
            }))
        }
    },
    put: {
        donate(context) {
            const { shoeId, currentDonation } = context.params;

            models.shoe.get(shoeId).then((response) => {
                const shoe = docModifier(response);

                shoe.collectedFunds += Number(currentDonation);
                shoe.donors.push(localStorage.getItem('userEmail'));

                return models.shoe.donate(shoeId, shoe)
            })
            .then((response) => {
                context.redirect('#/shoe/dashboard')
            })
        },
        edit(context) {
            const { shoeId } = context.params;

            models.shoe.get(shoeId).then((response) => {
                const shoe = docModifier(response);

                shoe.name = context.params.name;
                shoe.price = context.params.price;
                shoe.imageUrl = context.params.imageUrl;
                shoe.description = context.params.description;
                shoe.brand = context.params.brand;

                return models.shoe.update(shoeId, shoe);
            })
            .then((resp) => {
                context.redirect(`#/shoe/details/${shoeId}`)
            })
            .catch((e) => console.error(e))
        },
        like(context) {
            const { shoeId } = context.params;

            models.shoe.get(shoeId).then((response) => {
                const shoe = docModifier(response);
                console.log(shoe)

                shoe.buyers += 1;
                shoe.usersBouthShoes.push(localStorage.getItem('userEmail'));
                
                return models.shoe.update(shoeId, shoe)
            })
            .then((response) => {
                context.redirect(`#/shoe/details/${shoeId}`)
            })
        }
    }
};