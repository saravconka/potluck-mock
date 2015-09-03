//Potluck Controllers
var controllers = angular.module('potluck.controllers', ['potluck.factories']);

//Login Controller
controllers.controller('loginCtrl', ['$scope', '$location', 'AuthenticationSvc', function($scope, $location, AuthenticationSvc) {

    $scope.base = {};
    $scope.userName = "";
    $scope.userEmail = "";


    $scope.login = function() {

        //alert($scope.username + ' - ' + $scope.password);

        if (AuthenticationSvc.authenticate($scope.username, $scope.password)) {
            alert(AuthenticationSvc.current.userProfile.name + ' user is authenticated');

            $scope.base = AuthenticationSvc.current;
            $scope.userName = AuthenticationSvc.current.userProfile.name;
            $scope.userEmail = AuthenticationSvc.current.userProfile.email;

            $location.path('/landingpage');
        }
        else {
            alert('You have entered invalid username or password');

        }
    };

}]);

//Landing Page controller
controllers.controller('landingCtrl', ['$scope', '$location', 'AuthenticationSvc', 'EventSvc', function ($scope, $location, AuthenticationSvc, EventSvc) {

    $scope.userName = AuthenticationSvc.getSession().userProfile.name;
    $scope.userEmail = AuthenticationSvc.getSession().userProfile.email;

    $scope.createEvent = function () {
        $location.path('/createevent');
    }

    //REPLACE THIS WITH NGMOCK IMPLEMENTATION
    $scope.eventList = EventSvc.getEvents();

    //EventSvc.getEvents().success(function (data) {
    //    console.log(data[0].EventName);
    //    $scope.eventList = data;
    //}).error(function (e) {
    //    console.log(e);
    //});
    
    
}]);

//Registration page controller
controllers.controller('registrationCtrl', ['$scope', '$location', 'AuthenticationSvc', function($scope, $location, AuthenticationSvc) {

    $scope.cancelRegistration = function() {
        alert("hola");
        $location.path('/');
    };
}]);

controllers.controller('eventCtrl', ['$scope', '$location', 'AuthenticationSvc', 'EventSvc', function ($scope, $location, AuthenticationSvc, EventSvc) {

    $scope.createEvent = function () {
        alert($scope.eventname);

        EventSvc.AddEvent(
            $scope.eventname,
            $scope.eventdate,
            $scope.starttime,
            $scope.endtime,
            $scope.eventlocation,
            AuthenticationSvc.current.userProfile.name
        ).success(function (data) {
            alert("Successfully create event: " + $scope.eventname);
            $location.path('/landingpage');
        }).error(function (e) {


            
            $exceptionHandler(e)

            /*
            <div class="alert alert-danger">
                <strong>Exception</strong> Indicates a dangerous or potentially negative action.
            </div>
            */
            console.log(e);
        });
            

    };

    
}]);