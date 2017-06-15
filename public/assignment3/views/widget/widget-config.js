/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/user/:userId/website/:websiteId/page/:pageId/widget',{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'model'
            })

    }

})();