import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'

export default {
    get: {
        dashboard(context) {

            models.recipe.getAll().then((response) => {

                const recipes = response.docs.map(docModifier);

                context.recipes = recipes;

                extend(context).then(function () {
                    this.partial('../views/recipe/dashboard.hbs')
                })
            })
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/recipe/create.hbs')
            })
        },
        details(context) {
            const { recipeId } = context.params;

            models.recipe.get(recipeId)
                .then((response) => {

                    const recipe = docModifier(response);

                    Object.keys(recipe).forEach((key) => {
                        context[key] = recipe[key];
                    });

                    // context.canDonate = recipe.uid !== localStorage.getItem('userId');
                    context.canEdit = recipe.uid === localStorage.getItem('userId');
                    // context.organizer = localStorage.getItem("userEmail")

                    extend(context).then(function () {
                        this.partial('../views/recipe/details.hbs');
                    });
                })
                .catch((e) => console.error(e))
        },
        edit(context) {
            const { recipeId } = context.params;

            models.recipe.get(recipeId)
                .then((response) => {

                    const recipe = docModifier(response);

                    Object.keys(recipe).forEach((key) => {
                        context[key] = recipe[key];
                    });

                    context.canEdit = recipe.uid === localStorage.getItem('userId');

                    extend(context).then(function () {
                        this.partial('../views/recipe/edit.hbs');
                    });
                })
                .catch((e) => console.error(e))
        }
    },
    post: {
        create(context) {

            const categories = {
                'Vegetables and legumes/beans': 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
                'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
                'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
                'Milk, chees, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
                'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
            }

            const data = {
                ...context.params,
                ingredients: context.params.ingredients.split(','),
                uid: localStorage.getItem('userId'),
                likesCounter: 0,
                categoryImageURL: categories[context.params.category]
            };

            models.recipe.create(data)
                .then((response) => {
                    console.log(response)
                    context.redirect('#/recipe/dashboard');
                })
                .catch((e) => console.error(e));
        }
        , dashboard(context) {
            console.log(context.params)
        }
    },
    del: {
        close(context) {
            const { recipeId } = context.params;

            models.recipe.close(recipeId)
                .then(((response) => {
                    context.redirect('#/recipe/dashboard')
                }))
        }
    },
    put: {
        donate(context) {
            const { recipeId, currentDonation } = context.params;

            models.recipe.get(recipeId).then((response) => {
                const recipe = docModifier(response);

                recipe.collectedFunds += Number(currentDonation);
                recipe.donors.push(localStorage.getItem('userEmail'));

                return models.recipe.donate(recipeId, recipe)
            })
                .then((response) => {
                    context.redirect('#/recipe/dashboard')
                })
        },
        edit(context) {
            const { recipeId } = context.params;

            const categories = {
                'Vegetables and legumes/beans': 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
                'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
                'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
                'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
                'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
            }

            models.recipe.get(recipeId).then((response) => {
                const recipe = docModifier(response);

                recipe.meal = context.params.meal;
                recipe.ingredients = context.params.ingredients.split(',');
                recipe.prepMethod = context.params.prepMethod;
                recipe.description = context.params.description;
                recipe.foodImageURL = context.params.foodImageURL;
                recipe.category = context.params.category;
                recipe.categoryImageURL = categories[recipe.category]
                console.log(recipe.category)

                return models.recipe.update(recipeId, recipe);
            })
                .then((resp) => {
                    context.redirect(`#/recipe/details/${recipeId}`)
                })
                .catch((e) => console.error(e))
        },
        like(context) {
            const { recipeId } = context.params;

            models.recipe.get(recipeId).then((response) => {
                const recipe = docModifier(response);
                console.log(recipe)

                recipe.likesCounter += 1;

                return models.recipe.update(recipeId, recipe)
            })
                .then((response) => {
                    context.redirect(`#/recipe/details/${recipeId}`)
                })
        }
    }
};