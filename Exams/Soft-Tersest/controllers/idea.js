import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'

export default {
    get: {
        dashboard(context) {

            models.idea.getAll().then((response) => {

                const ideas = response.docs.map(docModifier);

                context.ideas = ideas;

                extend(context).then(function () {
                    this.partial('../views/idea/dashboard.hbs')
                })
            })
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/idea/create.hbs')
            })
        },
        details(context) {
            const { ideaId } = context.params;

            models.idea.get(ideaId)
                .then((response) => {

                    const idea = docModifier(response);

                    Object.keys(idea).forEach((key) => {
                        context[key] = idea[key];
                    });

                    // context.canDonate = idea.uid !== localStorage.getItem('userId');
                    context.canEdit = idea.uid === localStorage.getItem('userId');
                    // context.organizer = localStorage.getItem("userEmail");
                    // context.haveLikesFromCurrentUser = idea.usersLiked.includes(localStorage.getItem("userEmail"));

                    extend(context).then(function () {
                        this.partial('../views/idea/details.hbs');
                    });
                })
                .catch((e) => console.error(e))
        },
        edit(context) {
            const { ideaId } = context.params;

            models.idea.get(ideaId)
                .then((response) => {

                    const idea = docModifier(response);

                    Object.keys(idea).forEach((key) => {
                        context[key] = idea[key];
                    });

                    context.canEdit = idea.uid === localStorage.getItem('userId');

                    extend(context).then(function () {
                        this.partial('../views/idea/edit.hbs');
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
                creator: localStorage.getItem('userEmail'),
                likes: 0,
                comments: []
            };

            models.idea.create(data)
                .then((response) => {
                    console.log(response)
                    context.redirect('#/idea/dashboard');
                })
                .catch((e) => console.error(e));
        }
        , dashboard(context) {
            console.log(context.params)
        }
    },
    del: {
        close(context) {
            const { ideaId } = context.params;

            models.idea.close(ideaId)
                .then(((response) => {
                    context.redirect('#/idea/dashboard')
                }))
        }
    },
    put: {
        donate(context) {
            const { ideaId, currentDonation } = context.params;

            models.idea.get(ideaId).then((response) => {
                const idea = docModifier(response);

                idea.collectedFunds += Number(currentDonation);
                idea.donors.push(localStorage.getItem('userEmail'));

                return models.idea.donate(ideaId, idea)
            })
                .then((response) => {
                    context.redirect('#/idea/dashboard')
                })
        },
        comment(context) {
            const { ideaId, newComment } = context.params;
            models.idea.get(ideaId).then((resp) => {
                const idea = docModifier(resp);
                const currentUserEmail = localStorage.getItem('userEmail');
                const currentComment = {
                    writer: currentUserEmail,
                    comment: newComment
                }

                idea.comments.push(currentComment);

                return models.idea.update(ideaId, idea)
            })
                .then((resp) => {
                    context.redirect(`#/idea/details/${ideaId}`);
                })
        },
        edit(context) {
            const { ideaId } = context.params;

            models.idea.get(ideaId).then((response) => {
                const idea = docModifier(response);

                idea.title = context.params.title;
                idea.description = context.params.description;
                idea.imageUrl = context.params.imageUrl;

                return models.idea.update(ideaId, idea);
            })
                .then((resp) => {
                    context.redirect(`#/idea/details/${ideaId}`)
                })
                .catch((e) => console.error(e))
        },
        like(context) {
            const { ideaId } = context.params;

            models.idea.get(ideaId).then((response) => {
                const idea = docModifier(response);
                console.log(idea)

                idea.likes += 1;
                // idea.usersLiked.push(localStorage.getItem('userEmail'));

                return models.idea.update(ideaId, idea)
            })
                .then((response) => {
                    context.redirect(`#/idea/details/${ideaId}`)
                })
        }
    }
};