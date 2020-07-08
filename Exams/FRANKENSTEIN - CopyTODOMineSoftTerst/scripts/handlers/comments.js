import { requester } from './../services/app-service.js'

export async function commentsHandler() {

    await requester.ideas.patchEntity({
        comments: this.params.currentComment.push(this.params.newComment)
    }, this.params.id)

    // sessionStorage.getItem('userId')
    this.redirect(`#/details/${this.params.id}`);
    return false;
}