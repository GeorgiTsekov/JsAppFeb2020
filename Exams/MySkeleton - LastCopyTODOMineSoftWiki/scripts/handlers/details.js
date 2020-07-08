import { applyCommon } from './common.js';
import { requester } from '../services/app-service.js';


export async function detailsHandler() {
    /**
     * Gets one team from the db and map it to the expected by the template value + add it to the template context
     * 
     * -- this.params comes from the navigation url!!
     */
    this.teamId = this.params.id;
    let {createdByName, title, category, content, createdById, id} = await requester.articles.getById(this.params.id);
    this.articleId = this.params.id;
    this.title = title;
    this.id = id;
    this.category = category;
    this.content = content;
    // {{#if userIsCreator}}
    this.createdByName = createdByName;
    this.userIsCreator = sessionStorage.getItem('userId') === createdById;


    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    this.partial('./templates/details/details.hbs');
}