import controllers from '../controllers/index.js';

const app = Sammy('#rooter', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home)

    //User
    this.get("#/user/login", controllers.user.get.login);
    this.get("#/user/register", controllers.user.get.register);

    this.post("#/user/login", controllers.user.post.login);
    this.post("#/user/register", controllers.user.post.register);
    this.get("#/user/logout", controllers.user.get.logout);
    // this.get("#/user/profile", controllers.user.get.profile);
    
    // //recipe
    this.get('#/recipe/dashboard', controllers.recipe.get.dashboard);
    this.get('#/recipe/create', controllers.recipe.get.create);
    this.get("#/recipe/details/:recipeId", controllers.recipe.get.details);
    this.get("#/recipe/edit/:recipeId", controllers.recipe.get.edit);

    this.post('#/recipe/create', controllers.recipe.post.create);
    this.post('#/recipe/edit/:recipeId', controllers.recipe.put.edit);
    this.get("#/recipe/close/:recipeId", controllers.recipe.del.close);
    this.get("#/recipe/like/:recipeId", controllers.recipe.put.like);

    // this.post("#/recipe/donate/:recipeId", controllers.recipe.put.donate);
});

(() => {
    app.run('#/home');
})();