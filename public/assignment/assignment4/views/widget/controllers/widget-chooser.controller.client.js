/**
 * Created by manika on 6/26/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", widgetChooseController);
    function widgetChooseController($location, $routeParams) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetTypeList = ['Header', 'Image', 'Youtube', 'HTML', 'Label' ,'Text Input', 'Link', 'Button', 'Data Table', 'Repeater'];
        model.navigateNewWidget = navigateNewWidget;

        function navigateNewWidget(widgetType) {
            widgetType = widgetType.toUpperCase();
            if (widgetType === 'HEADER') {
                widgetType = 'HEADING';
            }
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widgetType + '/new');
        }


    }
})();