import { requester } from './../services/app-service.js'

export async function likesHandler() {

    await requester.articles.patchEntity({
        collectedFunds: Number(this.params.currentFunds) + Number(this.params.currentDonation)
    }, this.params.id)
    
    //TODO donators.push()
    // sessionStorage.getItem('userId')
    this.redirect(`#/details/${this.params.id}`);

    return false;
}
// import { requester } from './../services/app-service.js'

// export async function likesHandler() {

//     await requester.causes.patchEntity({
//         likes: Number(this.params.currentLikes) + 1
//     }, this.params.id)

//     this.redirect(`#/details/${this.params.id}`)

//     return false;
// }