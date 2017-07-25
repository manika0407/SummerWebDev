/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .config(configuration);

        function configuration($routeProvider){
                $routeProvider
                    .when('/',{
                        templateUrl: 'views/home/home.view.client.html',
                        controller: 'homeController',
                        controllerAs: 'model',
                        resolve:{
                            currentUser: checkCurrentUser
                        }

                    })
                    .when('default',{
                        templateUrl: 'views/home/home.view.client.html',
                        controller: 'homeController',
                        controllerAs: 'model',
                        resolve:{
                            currentUser: checkCurrentUser
                        }
                    })
                    .when('/admin',{
                        templateUrl: 'views/admin/templates/admin.view.client.html',
                        resolve:{
                            currentUser: checkAdmin
                        }
                    })
                    .when('/admin/user/',{
                        templateUrl: 'views/admin/templates/admin-users.view.client.html',
                        controller: 'adminUserController',
                        controllerAs: 'model',
                        resolve:{
                            currentUser: checkAdmin
                        }
                    })

            function checkCurrentUser($q, userService) {
                var deferred=   $q.defer();
                userService
                    .checkLoggedIn()
                    .then(function (user) {

                        if(user === '0'){
                            deferred.resolve({});
                        }
                        else{
                            deferred.resolve(user);
                        }
                    });
                return deferred.promise;
            }

            function checkAdmin($q,$location, userService) {
                var deferred=   $q.defer();
                userService
                    .checkAdmin()
                    .then(function (user) {

                        if(user === '0'){
                            deferred.resolve({});
                            $location.url('/');
                        }
                        else{
                            deferred.resolve(user);
                        }
                    });
                return deferred.promise;
            }


        }

})();