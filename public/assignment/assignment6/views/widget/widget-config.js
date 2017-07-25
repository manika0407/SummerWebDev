(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/user/:userId/website/:websiteId/page/:pageId/widget',{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })



            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId',{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search',{
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
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