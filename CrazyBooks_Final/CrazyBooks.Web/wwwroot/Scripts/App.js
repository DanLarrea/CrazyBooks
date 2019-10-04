var app = angular.module('CrazyBooksApp', ['ngAnimate', 'ngRoute', 'ui.grid', 'ui.bootstrap']);

app.config( function ( $routeProvider, $locationProvider ) 
{
    $routeProvider.when('/login',
        {
            template: '<login></login>'
        });
    $routeProvider.when('/register',
        {
            template: '<register></register>'
        });
    $routeProvider.when('/books',
        {
            template: '<books></books>'
        });
    $routeProvider.when('/users',
        {
            template: '<users></users>'
        });
    $routeProvider.when('/rooms',
        {
            template: '<rooms></rooms>'
        });
    $routeProvider.when('/lends',
        {
            template: '<lends></lends>'
        });
    $routeProvider.when('/reservations',
        {
            template: '<reservations></reservations>'
        });
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});