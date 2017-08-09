
(function () {
      angular
          .module('MyBookApp')
          .config(configuration);

      function configuration($routeProvider) {
             $routeProvider
                 .when('/', {
                       templateUrl: 'views/home/templates/home.view.client.html',
                       controller: 'mainController',
                       controllerAs: 'model',
                     resolve:{
                         currentUser: checkCurrentUser
                     }
                 })

      }
    function checkLoggedIn(userService, $q, $location) {

        var deferred = $q.defer();

        userService.checkLoggedIn()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q) {

        var deferred = $q.defer();

        userService.checkLoggedIn()
            .then(function (user) {
                if(user === '0'){
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();