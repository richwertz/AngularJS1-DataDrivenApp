var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        if (error == 'AUTH_REQUIRED') {
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
        } //Auth Required
    }); //$routeChangeError
}]); //run

//Routs are below

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/checkins/:uId/:mId', { //uId = user ID; mId = meeting ID
            templateUrl: 'views/checkins.html',
            controller: 'CheckInsController'
        }).
        when('/checkins/:uId/:mId/checkinsList', { //uId = user ID; mId = meeting ID
            templateUrl: 'views/checkinslist.html',
            controller: 'CheckInsController'
        }).
        when('/meetings', {
            templateUrl: 'views/meetings.html',
            controller: 'MeetingsController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                } //currentAugh
            } //resolve
        }).
        otherwise({
        redirectTo: '/meetings'
        });
}]);