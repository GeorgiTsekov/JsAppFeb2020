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
            models.post.getAll()
            .then((response) => {
                const posts = [];
                const postsObj = response.docs.map(docModifier);
                Object.keys(postsObj).forEach((key) => {
                    console.log(postsObj[key])
                    if (localStorage.getItem("userId") === postsObj[key].uid) {
                        posts.push(postsObj[key].location);
                    }
                });
                context.posts = posts;
                context.wishedposts = posts.length;
                // console.log(posts);

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
                    context.redirect("#/post/create")
                })
                .catch((e) => console.error(e));
        },
        register(context) {

            const { email, password, repeatPassword } = context.params;

            if (password === repeatPassword) {

                models.user.register(email, password)
                    .then((response) => {

                        context.redirect("#/post/create");
                    })
                    .catch((e) => console.error(e));
            }
        }
    }
};