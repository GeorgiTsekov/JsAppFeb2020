import { applyCommon } from './common.js';
import { requester } from '../services/app-service.js';

export async function causesCatalogHandler() {

    await applyCommon.call(this);

    let ideas = await requester.ideas.getAll();

    this.ideas = Object.entries(ideas || {}).map(([ideaId, idea]) => ({ ...idea, ideaId }));

    this.loggedInWithCauses = sessionStorage.getItem('token') && this.ideas.length > 0;
    this.loggedInWithNoCauses = sessionStorage.getItem('token') && this.ideas.length === 0;

    this.partial('./templates/causesCatalog/causesCatalog.hbs');
}