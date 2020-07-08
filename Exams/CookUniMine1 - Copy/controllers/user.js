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
            models.recipe.getAll()
            .then((response) => {
                const recipes = [];
                const recipesObj = response.docs.map(docModifier);
                Object.keys(recipesObj).forEach((key) => {
                    console.log(recipesObj[key])
                    if (localStorage.getItem("userId") === recipesObj[key].uid) {
                        recipes.push(recipesObj[key].location);
                    }
                });
                context.recipes = recipes;
                context.wishedrecipes = recipes.length;
                // console.log(recipes);

                extend(context).then(function () {
                    this.partial('../views/user/profile.hbs');
                });
            });

        }
    },
    post: {
        login(context) {
            const { username, password } = context.params;

            models.user.login(username, password)
                .then((response) => {
                    context.user = response;
                    context.username = response.username;
                    context.isLoggedIn = true;
                    context.redirect("#/recipe/dashboard")
                })
                .catch((e) => console.error(e));
        },
        register(context) {

            const { username, password, repeatPassword } = context.params;

            if (password === repeatPassword) {

                models.user.register(username, password)
                    .then((response) => {

                        context.redirect("#/recipe/dashboard");
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
};