//potluck angular app object
var potluck = angular.module('potluck',[
  'ngRoute', 
  'potluck.services',
  'potluck.controllers'
  ,'ngMockE2E'
]);

/* TODO: Write global exception handler method to inject and display user friendly error msg


angular.module('exceptionOverride', []).factory('$exceptionHandler', function () {
    return function (exception, cause) {
        exception.message += ' (caused by "' + cause + '")';
        throw exception;
    };
});
*/


//Routing configurations
potluck.config(function($routeProvider, $locationProvider){

    $routeProvider.when('/', {
      templateUrl: 'login.html',
      controller: 'loginCtrl'
    });
    
    $routeProvider.when('/landingpage', {
        templateUrl: 'upcoming-events.html',
      controller: 'landingCtrl'
    });
    
    
    $routeProvider.when('/registration', {
      templateUrl: 'registration.html',
      controller: 'registrationCtrl'
    });
    
    
    $routeProvider.when('/forgotpassword', {
      templateUrl: 'choose-password.html' 
    });

    $routeProvider.when('/createevent', {
        templateUrl: 'create-event.html',
        controller: 'eventCtrl'
    });
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);  //Used to remove # and make pretty Urls

});


//FAKING MOCK BACKEND for data mocking
potluck.run(function ($httpBackend) {

    //$httpBackend.whenGET('api/Events').respond(function (method, url, data) {
    //    console.log(method);
    //    return [200, getMockData(mockType.eventList), {}];
    //});

    //$httpBackend.when('GET','api/Events').respond(function (method, url, data, headers) {
    //    $log(method);
    //    return [200, getMockData(mockType.eventList), {}];
    //});

    /// Above code snippet is same as below one line code!

    $httpBackend.whenGET('api/Events').respond(getMockData(mockType.eventList));

    

    /// Wild card - passThrough all other html files as normal http calls
    $httpBackend.whenGET(/^.*/).passThrough();

    //$httpBackend.whenGET('login.html').passThrough();
    //$httpBackend.whenGET('upcoming-events.html').passThrough();
    //$httpBackend.whenGET('registration.html').passThrough();
    //$httpBackend.whenGET('registration.html').passThrough();
    //$httpBackend.whenGET('choose-password.html').passThrough();
 
});
