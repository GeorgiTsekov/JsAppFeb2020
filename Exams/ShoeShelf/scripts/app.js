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
    
    // //shoe
    this.get('#/shoe/dashboard', controllers.shoe.get.dashboard);
    this.get('#/shoe/create', controllers.shoe.get.create);
    this.get("#/shoe/details/:shoeId", controllers.shoe.get.details);
    this.get("#/shoe/edit/:shoeId", controllers.shoe.get.edit);

    this.post('#/shoe/create', controllers.shoe.post.create);
    this.post('#/shoe/edit/:shoeId', controllers.shoe.put.edit);
    this.get("#/shoe/close/:shoeId", controllers.shoe.del.close);
    this.get("#/shoe/like/:shoeId", controllers.shoe.put.like);

    // this.post("#/shoe/donate/:shoeId", controllers.shoe.put.donate);
});

(() => {
    app.run('#/home');
})();