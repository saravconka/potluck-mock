//Angular Factories:
var factories = angular.module('potluck.factories', []);

factories.factory('StorageFactory', function() {

    var storageFactory = {};

    var validateBrowser = function() {
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            return true;
        }
        else {
            // Sorry! No Web Storage support..
            return false;
        }
    };

    storageFactory.getLocalStore = function(storeName) {
        var store = null;
        if (validateBrowser() && storeName !== null) {
            store = JSON.parse(localStorage.getItem(storeName));
        }
        return store;
    };

    storageFactory.setLocalStore = function(storeName, storeValue) {
        if (validateBrowser() && storeName !== null) {
            localStorage.setItem(storeName, JSON.stringify(storeValue));
        }
    };


    storageFactory.getSessionStore = function(storeName) {
        var store = null;
        if (validateBrowser() && storeName !== null) {
            store = JSON.parse(sessionStorage.getItem(storeName));
        }
        return store;
    };

    storageFactory.setSessionStore = function(storeName, storeValue) {
        if (validateBrowser() && storeName !== null) {
            sessionStorage.setItem(storeName, JSON.stringify(storeValue));
        }
    };

    return storageFactory;
});


factories.factory('AuthenticationSvc', ['$http', 'StorageFactory', function($http, StorageFactory) { //SARA TODO: LATER PASS $http make restful API call
    var _authApi = {};
    var _current = {};
    var _userProfile = {};

    _authApi.getSession = function() {
        return StorageFactory.getSessionStore('currentsession');
    };

    _authApi.authenticate = function(username, password) {

        var event1;

        /*$http.get('/api/Event/1').success(function (data) {
            event1 = data;
            console.log("Event ID:" + data.EventId + " Event Name:" + data.EventName);
        }).error(function (error) {
            event1 = error;
            console.log("error:" + error);
        });

        console.log(event1);
        */

        if (username.toLowerCase() === 'demo' && password.toLowerCase() === 'demo') {
            _userProfile.name = 'demo';
            _userProfile.email = 'demo@test.com';

            _current.userProfile = _userProfile;
            _authApi.current = _current;

            StorageFactory.setSessionStore('currentsession', _current);

            return true;
        }
    };

    return _authApi;
}]);


factories.factory('EventSvc', ['$http', '$exceptionHandler', 'StorageFactory', function ($http, $exceptionHandler, StorageFactory) {

    var _eventApi = {};

    _eventApi.getEvents = function () {

        if (_MOCK) {
            return _MOCKEventList;
        }

        return $http.get('api/Event').success(function (data) {

            console.log(data);

            //return JSON.parse(data);
            return data;

        }).error(function (error) {

            $exceptionHandler(error);

            console.log(error);

            throw error;
        });
    };


    _eventApi.AddEvent = function (eventname, eventdate, starttime, endtime, eventlocation, createdBy) {

        var event = {
            "EventId": Math.random(),
            "EventName": "Event:" + eventname,
            "EventStartDateTime": eventdate,
            "EventEndDateTime": endtime,
            "EventCreatedBy": createdBy,
            "EventCreatedDate": Date.now().toString(),
            "EventModifiedBy": null,
            "EventModifiedDate": null
        };

        return $http.post(
                'api/Event',
                JSON.stringify(event),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).success(function (data) {
                console.log(data);

                //return JSON.parse(data);
                return data;

            }).error(function (error) {

                $exceptionHandler(error);

                console.log(error);

                throw error;
        });

    };


    return _eventApi;
76}]);