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
    // this.get("#/user/profile", controllers.user.get.profile);
    
    // //post
    // this.get('#/post/dashboard', controllers.post.get.dashboard);
    this.get('#/post/create', controllers.post.get.create);
    this.get("#/post/details/:postId", controllers.post.get.details);
    this.get("#/post/edit/:postId", controllers.post.get.edit);

    this.post('#/post/create', controllers.post.post.create);
    this.post('#/post/edit/:postId', controllers.post.put.edit);
    this.get("#/post/close/:postId", controllers.post.del.close);
    // this.get("#/post/like/:postId", controllers.post.put.like);
    // this.post("#/post/donate/:postId", controllers.post.put.donate);
});

(() => {
    app.run('#/home');
})();