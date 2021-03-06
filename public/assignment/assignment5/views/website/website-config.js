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
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new',{
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId',{
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model'
            })
    }

})();


