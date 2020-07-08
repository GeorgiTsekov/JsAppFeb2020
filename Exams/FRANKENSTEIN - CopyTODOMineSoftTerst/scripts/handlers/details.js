import { applyCommon } from './common.js';
import { requester } from '../services/app-service.js';


export async function detailsHandler() {
    /**
     * Gets one team from the db and map it to the expected by the template value + add it to the template context
     * 
     * -- this.params comes from the navigation url!!
     */
    // this.teamId = this.params.id;
    let { createdByName, title, description, imageURL, createdById, likes, comments } = await requester.ideas.getById(this.params.id);
    this.ideaId = this.params.id;
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.comments = comments;
    this.likes = likes;
    // {{#if userIsCreator}}
    this.createdByName = createdByName;
    this.userIsCreator = sessionStorage.getItem('userId') === createdById;
    //{{#if haveComments}}
    // this.haveComments = sessionStorage.getItem('token') && Array.from(this.comments).length > 0;
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    this.partial('./templates/details/details.hbs');
}