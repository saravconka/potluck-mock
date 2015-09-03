//Angular Services:
var services = angular.module('potluck.services', []);
/*
//AuthenticationService
services.service('AuthenticationSvc', ['StorageFactory',function(StorageFactory){        //SARA TODO: LATER PASS $http make restful API call
  var _authApi = {};
  var _current = {};
  var _userProfile = {};

  _authApi.current = function() {
    return StorageFactory.getSessionStore('currentsession');
  };
  
  _authApi.authenticate = function(username, password){
    
    if(username.toLowerCase() === 'demo' && password.toLowerCase() ==='demo'){
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
*/