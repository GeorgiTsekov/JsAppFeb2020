import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';
import fillFormWithData from '../utils/formFiller.js';

export default {
    get: {
        
        create(context) {
            extend(context).then(function () {
                this.partial('../views/article/create.hbs');
            });
        },
        details(context) {
            const { articleId } = context.params;
            models.article.get(articleId).then(response => {

                const trek = docModifier(response);
                Object.keys(trek).forEach(key => context[key] = trek[key]);

                context.isNotAuthor = trek.uid !== localStorage.getItem('userId');

                extend(context).then(function () {
                    this.partial('../views/article/details.hbs');
                });

            })
                .catch(e => alert(e.message));
        },
        edit(context) {
            extend(context).then(function () {
                context.id = context.params.articleId;
                this.partial('../views/article/edit.hbs');
            });

            const { articleId } = context.params;
            
            models.article.get(articleId).then(response => {
                const formValues = response.data();
                const formRef = document.querySelector('form');
                fillFormWithData(formRef, formValues);
            });

        }
    },
    post: {
        create(context) {
            
            const data = {
                ...context.params,
                uid: localStorage.getItem('userId'),
                creator: localStorage.getItem('userEmail'),
                category: context.params.category

            }
            
           
            
            models.article.create(data)
                .then(response => {
                    context.redirect('#/home');
                })
                .catch(e => alert(e.message));
        }

    },
    del: {
        close(context) {
            const { articleId } = context.params;
            models.article.close(articleId).then(response => {
                context.redirect('#/home');
            })
                .catch(e => alert(e.message));
        }
    },
    put: {
        
        edit(context) {
            const { articleId } = context.params;
            const article = {
                ...context.params,
                uid: localStorage.getItem('userId')
            }
            
            models.article.edit(articleId, article)
                .then(response => {
                    context.redirect(`#/details/${articleId}`);
                })
                .catch(e => alert(e.message));
        }
    }
}