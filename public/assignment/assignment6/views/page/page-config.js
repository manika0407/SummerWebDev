/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })

            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
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