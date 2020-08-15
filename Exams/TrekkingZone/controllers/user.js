import models from '../models/index.js';
import extend from '../utils/context.js';
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
                context.redirect('#/home');
            })
        },
        profile(context) {
            models.trek.getAll()
            .then((response) => {
                const treks = [];
                const treksObj = response.docs.map(docModifier);
                Object.keys(treksObj).forEach((key) => {
                    console.log(treksObj[key])
                    if (localStorage.getItem("userId") === treksObj[key].uid) {
                        treks.push(treksObj[key].location);
                    }
                });
                context.treks = treks;
                context.wishedTreks = treks.length;
                // console.log(treks);

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
                    context.redirect("#/trek/dashboard")
                })
                .catch((e) => console.error(e));
        },
        register(context) {

            const { email, password, rePassword } = context.params;

            if (password === rePassword) {

                models.user.register(email, password)
                    .then((response) => {

                        context.redirect("#/trek/dashboard");
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
};