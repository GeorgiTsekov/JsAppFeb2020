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
                context.redirect('#/home');
            })
        },
        profile(context) {
            models.idea.getAll()
            .then((response) => {
                const ideas = [];
                const ideasObj = response.docs.map(docModifier);
                Object.keys(ideasObj).forEach((key) => {
                    console.log(ideasObj[key])
                    if (localStorage.getItem("userId") === ideasObj[key].uid) {
                        ideas.push(ideasObj[key].title);
                    }
                });
                context.ideas = ideas;
                context.wishedideas = ideas.length;
                // console.log(ideas);

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
                    context.redirect("#/idea/dashboard")
                })
                .catch((e) => console.error(e));
        },
        register(context) {

            const { email, password, repeatPassword } = context.params;

            if (password === repeatPassword) {

                models.user.register(email, password)
                    .then((response) => {

                        context.redirect("#/idea/dashboard");
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
};