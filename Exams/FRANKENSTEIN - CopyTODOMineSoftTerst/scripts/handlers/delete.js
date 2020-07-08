import { requester } from './../services/app-service.js'

export async function deleteHandler() {

    await requester.ideas.deleteEntity(this.params.id);

    this.redirect('#/causesCatalog')
}