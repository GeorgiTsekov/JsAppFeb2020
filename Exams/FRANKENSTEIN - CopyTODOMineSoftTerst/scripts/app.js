import { requester } from './services/app-service.js';
import {
    homeViewHandler,
    aboutViewHandler,
    loginHandler,
    registerViewHandler,
    logoutHandler,
    detailsHandler,
    likesHandler,
    causesCatalogHandler,
    editHandler as editHandler,
    joinTeamHandler,
    leaveTeamHandler,
    commentsHandler as commentsHandler,
    deleteHandler,
    createTrekHandler
} from './handlers/index.js';

const apiKey = 'https://remoteprojectteammanager.firebaseio.com/';
requester.init(apiKey, sessionStorage.getItem('token'));


/**
 * Configure the application with all it's routes and the template engine that it uses 
 */
const app = Sammy('#main', function () {
    /**
     * Setting handlebars as template engine
     */
    this.use('Handlebars', 'hbs');

    /**
     * Define routes to be used by the application
     */
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);

    this.get('#/register', registerViewHandler);
    this.post('#/register', () => false);

    this.get('#/logout', logoutHandler);

    this.get('#/login', loginHandler);
    this.post('#/login', () => false);

    this.get('#/create', createTrekHandler);
    this.post('#/create', () => false);
    
    
    this.get('#/details/:id', detailsHandler);
    
    this.get('#/delete/:id', deleteHandler)
    
    this.get('#/likes/:currentLikes/:id', likesHandler);

    this.post('#/comments/:currentComment/:id', commentsHandler);

    // this.get('#/edit/:id', editHandler);
    // this.post('#/edit/:id', () => false);
    
    
    
    
    this.get('#/causesCatalog', causesCatalogHandler);
    this.post('#/causesCatalog', () => false);

    // this.get('#/about', aboutViewHandler);
    // this.get('#/catalog', catalogueHandler);
    // this.post('#/catalog', () => false);
    // this.get('#/join/:id', joinTeamHandler);
    // this.get('#/leave/:id', leaveTeamHandler);
});
/**
 * Start the application
 */
app.run('#/');
