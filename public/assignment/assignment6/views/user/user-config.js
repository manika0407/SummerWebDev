/**
 * Created by manika on 6/14/17.
 */
/**
 * Created by manika on 6/12/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/login',{
                templateUrl:'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register',{
                templateUrl:'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'

            })
            .when('/profile',{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller:'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })

        function checkLoggedIn($q, $location, userService) {
            var deferred=   $q.defer();
            userService
                .checkLoggedIn()
                .then(function (currentUser) {

                    if(currentUser === '0'){
                        deferred.reject();
                        $location.url('/login')
                    }
                    else{
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }
    }

})();