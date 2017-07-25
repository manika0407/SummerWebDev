/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/user/:userId/website',{
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller:'websiteListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/user/:userId/website/new',{
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/user/:userId/website/:websiteId',{
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
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


