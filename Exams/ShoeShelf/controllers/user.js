import models from '../models/index.js';
import extend from '../utils/context.js'
import docModifier from '../utils/doc-modifier.js';

export default {
    get: {
        login(context) {

            extend(context)
            .then(function () {
                this.partial("../views/user/login.hbs")
            });
        },
        register(context) {

            extend(context)
            .then(function () {
                this.partial("../views/user/register.hbs")
            });
        },
        logout(context) {

            models.user.logout()
            .then((response) => {
                context.redirect('#/user/login');
            })
        },
        profile(context) {
            models.shoe.getAll()
            .then((response) => {
                const shoes = [];
                const shoesObj = response.docs.map(docModifier);
                Object.keys(shoesObj).forEach((key) => {
                    console.log(shoesObj[key])
                    if (localStorage.getItem("userId") === shoesObj[key].uid) {
                        shoes.push(shoesObj[key].location);
                    }
                });
                context.shoes = shoes;
                context.wishedshoes = shoes.length;
                // console.log(shoes);

                extend(context).then(function () {
                    this.partial('../views/user/profile.hbs');
                });
            });
        }
    },
    post: {
        login(context) {
            const { email, password } = context.params;

            models.user.login(email, password)
                .then((response) => {
                    context.user = response;
                    context.email = response.email;
                    context.isLoggedIn = true;
                    context.redirect("#/shoe/dashboard")
                })
                .catch((e) => console.error(e));
        },
        register(context) {

            const { email, password, repeatPassword } = context.params;

            if (password === repeatPassword) {

                models.user.register(email, password)
                    .then((response) => {

                        context.redirect("#/shoe/dashboard");
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
};