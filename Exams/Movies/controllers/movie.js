import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'

export default {
    get: {
        dashboard(context) {

            models.movie.getAll().then((response) => {

                const movies = response.docs.map(docModifier);

                context.movies = movies;

                extend(context).then(function () {
                    this.partial('../views/movie/dashboard.hbs')
                })
            })
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/movie/create.hbs')
            })
        },
        details(context) {
            const { movieId } = context.params;

            models.movie.get(movieId)
            .then((response) => {

                const movie = docModifier(response);

                Object.keys(movie).forEach((key) => {
                    context[key] = movie[key];
                });

                // context.canDonate = movie.uid !== localStorage.getItem('userId');
                context.canEdit = movie.uid === localStorage.getItem('userId');
                context.organizer = localStorage.getItem("userEmail");
                context.haveLikesFromCurrentUser = movie.usersLiked.includes(localStorage.getItem("userEmail"));

                extend(context).then(function() {
                    this.partial('../views/movie/details.hbs');
                });
            })
            .catch((e) => console.error(e))
        },
        edit(context) {
            const { movieId } = context.params;

            models.movie.get(movieId)
            .then((response) => {

                const movie = docModifier(response);

                Object.keys(movie).forEach((key) => {
                    context[key] = movie[key];
                });

                context.canEdit = movie.uid === localStorage.getItem('userId');

                extend(context).then(function() {
                    this.partial('../views/movie/edit.hbs');
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
                organizer: localStorage.getItem('userEmail'),
                usersLiked: []
            };

            models.movie.create(data)
                .then((response) => {
                    console.log(response)
                    context.redirect('#/movie/dashboard');
                })
                .catch((e) => console.error(e));
        }
        , dashboard(context) {
            console.log(context.params)
        }
    },
    del: {
        close(context) {
            const { movieId } = context.params;

            models.movie.close(movieId)
            .then(((response) => {
                context.redirect('#/movie/dashboard')
            }))
        }
    },
    put: {
        donate(context) {
            const { movieId, currentDonation } = context.params;

            models.movie.get(movieId).then((response) => {
                const movie = docModifier(response);

                movie.collectedFunds += Number(currentDonation);
                movie.donors.push(localStorage.getItem('userEmail'));

                return models.movie.donate(movieId, movie)
            })
            .then((response) => {
                context.redirect('#/movie/dashboard')
            })
        },
        edit(context) {
            const { movieId } = context.params;

            models.movie.get(movieId).then((response) => {
                const movie = docModifier(response);

                movie.title = context.params.title;
                movie.description = context.params.description;
                movie.imageUrl = context.params.imageUrl;

                return models.movie.update(movieId, movie);
            })
            .then((resp) => {
                context.redirect(`#/movie/details/${movieId}`)
            })
            .catch((e) => console.error(e))
        },
        like(context) {
            const { movieId } = context.params;

            models.movie.get(movieId).then((response) => {
                const movie = docModifier(response);
                console.log(movie)

                movie.likes += 1;
                movie.usersLiked.push(localStorage.getItem('userEmail'));
                
                return models.movie.update(movieId, movie)
            })
            .then((response) => {
                context.redirect(`#/movie/details/${movieId}`)
            })
        }
    }
};