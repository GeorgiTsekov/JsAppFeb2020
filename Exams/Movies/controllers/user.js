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
            models.movie.getAll()
            .then((response) => {
                const movies = [];
                const moviesObj = response.docs.map(docModifier);
                Object.keys(moviesObj).forEach((key) => {
                    console.log(moviesObj[key])
                    if (localStorage.getItem("userId") === moviesObj[key].uid) {
                        movies.push(moviesObj[key].location);
                    }
                });
                context.movies = movies;
                context.wishedmovies = movies.length;
                // console.log(movies);

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
                    context.redirect("#/movie/dashboard")
                })
                .catch((e) => console.error(e));
        },
        register(context) {

            const { email, password, repeatPassword } = context.params;

            if (password === repeatPassword) {

                models.user.register(email, password)
                    .then((response) => {

                        context.redirect("#/movie/dashboard");
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
};