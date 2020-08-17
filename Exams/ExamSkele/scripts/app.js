import controllers from '../controllers/index.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home)

    //User
    this.get("#/user/login", controllers.user.get.login);
    this.get("#/user/register", controllers.user.get.register);

    this.post("#/user/login", controllers.user.post.login);
    this.post("#/user/register", controllers.user.post.register);
    this.get("#/user/logout", controllers.user.get.logout);
    this.get("#/user/profile", controllers.user.get.profile);
    
    // //idea
    this.get('#/idea/dashboard', controllers.idea.get.dashboard);
    this.get('#/idea/create', controllers.idea.get.create);
    this.get("#/idea/details/:ideaId", controllers.idea.get.details);
    // this.get("#/idea/edit/:ideaId", controllers.idea.get.edit);
    this.get("#/idea/close/:ideaId", controllers.idea.del.close);
    this.get("#/idea/like/:ideaId", controllers.idea.put.like);

    this.post('#/idea/create', controllers.idea.post.create);
    // this.post('#/idea/edit/:ideaId', controllers.idea.put.edit);
    this.post("#/idea/comment/:ideaId", controllers.idea.put.comment);
    // this.post("#/idea/donate/:ideaId", controllers.idea.put.donate);
});

(() => {
    app.run('#/home');
})();