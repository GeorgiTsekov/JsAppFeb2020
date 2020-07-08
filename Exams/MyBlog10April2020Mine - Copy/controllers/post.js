import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'

export default {
    get: {
        dashboard(context) {

            models.post.getAll().then((response) => {

                const posts = response.docs.map(docModifier);

                context.posts = posts;

                extend(context).then(function () {
                    this.partial('../views/post/dashboard.hbs')
                })
            })
        },
        create(context) {
            models.post.getAll().then((response) => {

                const posts = response.docs.map(docModifier);

                context.posts = posts;

                extend(context).then(function () {
                    this.partial('../views/post/create.hbs')
                })
            })
        },
        details(context) {
            const { postId } = context.params;

            models.post.get(postId)
                .then((response) => {

                    const post = docModifier(response);

                    Object.keys(post).forEach((key) => {
                        context[key] = post[key];
                    });

                    // context.canDonate = post.uid !== localStorage.getItem('userId');
                    context.canEdit = post.uid === localStorage.getItem('userId');
                    // context.organizer = localStorage.getItem("userEmail")

                    extend(context).then(function () {
                        this.partial('../views/post/details.hbs');
                    });
                })
                .catch((e) => console.error(e))
        },
        edit(context) {
            models.post.getAll().then((response) => {

                const posts = response.docs.map(docModifier);

                context.posts = posts;
                const { postId } = context.params;

                models.post.get(postId)
                    .then((response) => {
    
                        const post = docModifier(response);
    
                        Object.keys(post).forEach((key) => {
                            context[key] = post[key];
                        });
    
                        context.canEdit = post.uid === localStorage.getItem('userId');
    
                        extend(context).then(function () {
                            this.partial('../views/post/edit.hbs');
                        });
                    })
                    .catch((e) => console.error(e))
            })
            
        }
    },
    post: {
        create(context) {

            const data = {
                ...context.params,
                uid: localStorage.getItem('userId')
                // likes: 0,
                // organizer: localStorage.getItem('userEmail')
            };

            models.post.create(data)
                .then((response) => {
                    console.log(response)
                    context.redirect('#/post/create');
                })
                .catch((e) => console.error(e));
        }
        , dashboard(context) {
            console.log(context.params)
        }
    },
    del: {
        close(context) {
            const { postId } = context.params;

            models.post.close(postId)
                .then(((response) => {
                    context.redirect('#/post/create')
                }))
        }
    },
    put: {
        donate(context) {
            const { postId, currentDonation } = context.params;

            models.post.get(postId).then((response) => {
                const post = docModifier(response);

                post.collectedFunds += Number(currentDonation);
                post.donors.push(localStorage.getItem('userEmail'));

                return models.post.donate(postId, post)
            })
                .then((response) => {
                    context.redirect('#/post/dashboard')
                })
        },
        edit(context) {
            const { postId } = context.params;

            models.post.get(postId).then((response) => {
                const post = docModifier(response);

                post.title = context.params.title;
                post.category = context.params.category;
                post.content = context.params.content;

                return models.post.update(postId, post);
            })
                .then((resp) => {
                    context.redirect('#/post/create')
                    // context.redirect(`#/post/details/${postId}`)
                })
                .catch((e) => console.error(e))
        },
        like(context) {
            const { postId } = context.params;

            models.post.get(postId).then((response) => {
                const post = docModifier(response);
                console.log(post)

                post.likes += 1;

                return models.post.update(postId, post)
            })
                .then((response) => {
                    context.redirect(`#/post/details/${postId}`)
                })
        }
    }
};