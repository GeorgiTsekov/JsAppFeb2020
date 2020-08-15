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
    
    // //movie
    this.get('#/movie/dashboard', controllers.movie.get.dashboard);
    this.get('#/movie/create', controllers.movie.get.create);
    this.get("#/movie/details/:movieId", controllers.movie.get.details);
    this.get("#/movie/edit/:movieId", controllers.movie.get.edit);

    this.post('#/movie/create', controllers.movie.post.create);
    this.post('#/movie/edit/:movieId', controllers.movie.put.edit);
    this.get("#/movie/close/:movieId", controllers.movie.del.close);
    this.get("#/movie/like/:movieId", controllers.movie.put.like);

    // this.post("#/movie/donate/:movieId", controllers.movie.put.donate);
});

(() => {
    app.run('#/home');
})();