import { applyCommon } from './common.js';
import { requester } from './../services/app-service.js';

export async function homeViewHandler() {
  /**
   * Load hbs templates
   */
  await applyCommon.call(this);

  // let ideas = await requester.ideas.getAll();

  // this.ideas = Object.entries(ideas || {}).map(([ideaId, idea]) => ( {...idea, ideaId} ));

  // this.loggedInWithCauses = sessionStorage.getItem('token') && this.ideas.length > 0;
  // this.loggedInWithNoCauses = sessionStorage.getItem('token') && this.ideas.length === 0;  

  // const articles = [];
  // Object.entries(await requester.articles.getAll() || {}).map(a => {
  //   if (this.loggedIn) {
  //     const newObj = a['1'];
  //     newObj.id = a['0'];
  //     articles.push(newObj);
  //   }
  // })

  // this.articles = articles;
  // this.javascript = articles.filter(x => x.category.toLowerCase() === "javascript").sort((a, b) => (a.title > b.title) ? 1 : -1);
  // this.cSharp = articles.filter(x => x.category.toLowerCase() === "c#").sort().sort((a, b) => (a.title > b.title) ? 1 : -1);
  // this.java = articles.filter(x => x.category.toLowerCase() === "java").sort().sort((a, b) => (a.title > b.title) ? 1 : -1);
  // this.pyton = articles.filter(x => x.category.toLowerCase() === "pyton").sort().sort((a, b) => (a.title > b.title) ? 1 : -1);
  // console.log(ideas)

  this.partial('./templates/home/home.hbs');
}
