import { applyCommon } from './common.js';
import { requester } from '../services/app-service.js';

export async function causesCatalogHandler() {
    
    await applyCommon.call(this);

    // let articles = await requester.articles.getAll();

    // this.articles = Object.entries(articles || {}).map(([articleId, article]) => ( {...article, articleId} ));

    // this.loggedInWithCauses = sessionStorage.getItem('token') && this.articles.length > 0;
    // this.loggedInWithNoCauses = sessionStorage.getItem('token') && this.articles.length === 0;  

    this.partial('./templates/causesCatalog/causesCatalog.hbs');
}