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
    
    //trek
    this.get('#/trek/dashboard', controllers.trek.get.dashboard);
    this.get('#/trek/create', controllers.trek.get.create);
    this.get("#/trek/details/:trekId", controllers.trek.get.details)
    this.get("#/trek/edit/:trekId", controllers.trek.get.edit)

    this.post('#/trek/create', controllers.trek.post.create);
    this.post("#/trek/edit/:trekId", controllers.trek.put.edit);
    this.get("#/trek/like/:trekId", controllers.trek.put.like);
    this.get("#/trek/close/:trekId", controllers.trek.del.close);
    // this.post("#/trek/donate/:trekId", controllers.trek.put.donate);
});

(() => {
    app.run('#/home');
})();