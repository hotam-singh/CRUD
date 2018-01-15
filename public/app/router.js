var appRoute = angular.module('appRoute', ['ngRoute']);

appRoute.config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'app/views/partials/home.html'
    })

    .when('/about', {
        templateUrl: 'app/views/partials/about.html'
    })

    .when('/contact', {
        templateUrl: 'app/views/partials/contact.html'
    })

    .when('/signup', {
        templateUrl: 'app/views/partials/register.html',
        controller: 'registerController',
        controllerAs: 'register'
    })

    .otherwise({ redirectTo : '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});