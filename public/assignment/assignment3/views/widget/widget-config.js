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
                controller: 'WidgetChooseController',
                controllerAs: 'model'
            })

            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetType/new', {
                templateUrl: 'views/widget/templates/widget-new.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId',{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })

    }

})();